import { Request, Response } from "express";
import prisma from "../../../../prisma/prisma";

export default function () {
  const operations = {
    GET,
  };

  async function GET(req: Request, res: Response) {
    const trackGroups = await prisma.trackGroup.findMany({
      where: {
        published: true,
      },
      include: {
        artist: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
    res.json({ results: trackGroups });
  }

  GET.apiDoc = {
    summary: "Returns all trackGroups",
    responses: {
      200: {
        description: "A list of trackGroups",
        schema: {
          type: "array",
          items: {
            $ref: "#/definitions/TrackGroup",
          },
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
