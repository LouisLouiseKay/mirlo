import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import multer from "multer";
import {
  userAuthenticated,
  userHasPermission,
} from "../../../../../../auth/passport";
import processTrackGroupCover from "../../../../../../utils/processImages";
import prisma from "../../../../../../../prisma/prisma";

const upload = multer({
  dest: process.env.MEDIA_LOCATION_INCOMING ?? "/data/media/incoming",
  limits: {
    fileSize: 10000000, // 10mb seems reasonable for a cover
  },
});

type Params = {
  trackGroupId: number;
  userId: string;
};

const isFileArray = (entity: unknown): entity is Express.Multer.File[] => {
  return true;
};

export default function () {
  const operations = {
    PUT: [
      userAuthenticated,
      userHasPermission("owner"),
      // upload.single("file"),
      upload.array("upload"),
      PUT,
    ],
  };

  async function PUT(req: Request, res: Response, next: NextFunction) {
    const { trackGroupId } = req.params as unknown as Params;
    const loggedInUser = req.user as User;
    try {
      const artists = await prisma.artist.findMany({
        where: {
          userId: Number(loggedInUser.id),
        },
      });

      const trackgroup = await prisma.trackGroup.findFirst({
        where: {
          artistId: { in: artists.map((a) => a.id) },
          id: Number(trackGroupId),
        },
        include: {
          tracks: {
            where: {
              deletedAt: null,
            },
            include: {
              audio: true,
            },
          },
          artist: true,
          cover: true,
        },
      });

      if (!trackgroup) {
        res.status(400).json({
          error: "Trackgroup must belong to user",
        });
        return next();
      }

      // TODO: Remove prior files
      // FIXME: Only allow uploading of one file.
      if (req.files && isFileArray(req.files)) {
        await processTrackGroupCover({ req, res })(req.files[0], trackGroupId);
      }

      // trackgroup.set("cover", file.filename);

      res.json({ message: "Success" });
    } catch (error) {
      console.error("Cover error", error);
      res.status(400).json({
        error: `TrackGroup with ID ${trackGroupId} does not exist in the database`,
      });
    }
  }

  PUT.apiDoc = {
    summary: "Updates a trackGroup cover belonging to a user",
    parameters: [
      {
        in: "path",
        name: "userId",
        required: true,
        type: "string",
      },
      {
        in: "path",
        name: "trackGroupId",
        required: true,
        type: "string",
      },
      {
        in: "formData",
        name: "file",
        type: "file",
        required: true,
        description: "The cover to upload",
      },
    ],
    responses: {
      200: {
        description: "Updated trackgroup",
        schema: {
          $ref: "#/definitions/TrackGroup",
        },
      },
      default: {
        description: "An error occurred",
        schema: {
          additionalProperties: true,
        },
      },
    },
  };

  return operations;
}
