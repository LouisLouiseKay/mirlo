import { css } from "@emotion/css";
import React from "react";
import { FaLink, FaPause, FaPlay } from "react-icons/fa";
import { useGlobalStateContext } from "state/GlobalState";
import useDraggableTrack from "utils/useDraggableTrack";

import IconButton from "./IconButton";
import { fmtMSS, isTrackOwnedOrPreview, widgetUrl } from "utils/tracks";
import { useSnackbar } from "state/SnackbarContext";
import { bp } from "../../constants";

const TrackRow: React.FC<{
  track: Track;
  trackGroup: TrackGroup;
  addTracksToQueue: (id: number) => void;
}> = ({ track, addTracksToQueue, trackGroup }) => {
  const snackbar = useSnackbar();
  const [trackTitle] = React.useState(track.title);
  const {
    state: { playerQueueIds, playing, currentlyPlayingIndex, user },
    dispatch,
  } = useGlobalStateContext();
  const { onDragStart, onDragEnd } = useDraggableTrack();

  const currentPlayingTrackId =
    currentlyPlayingIndex !== undefined
      ? playerQueueIds[currentlyPlayingIndex]
      : undefined;

  const onTrackPlay = React.useCallback(() => {
    addTracksToQueue(track.id);
    dispatch({ type: "setPlaying", playing: true });
  }, [dispatch, addTracksToQueue, track.id]);

  const onTrackPause = React.useCallback(() => {
    dispatch({ type: "setPlaying", playing: false });
  }, [dispatch]);

  const canPlayTrack = isTrackOwnedOrPreview(track, user, trackGroup);

  return (
    <tr
      key={track.id}
      id={`${track.id}`}
      onDragOver={(ev) => ev.preventDefault()}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={css`
        ${!canPlayTrack ? `color: var(--mi-light-foreground-color);` : ""}

        &:hover > td > .play-button {
          opacity: 1;
        }
        font-size: 18px;

        @media screen and (max-width: ${bp.medium}px) {
          font-size: 16px;
          td {
            padding: 0.15rem 0.3rem;
          }
        }

        button {
          font-size: 16px;
        }
      `}
    >
      <td
        className={css`
          width: 30px;
        `}
      >
        {canPlayTrack && (
          <>
            {(!playing || currentPlayingTrackId !== track.id) && (
              <IconButton compact className="play-button" onClick={onTrackPlay}>
                <FaPlay />
              </IconButton>
            )}
            {playing && currentPlayingTrackId === track.id && (
              <IconButton
                compact
                data-cy="track-row-pause-button"
                onClick={onTrackPause}
              >
                <FaPause />
              </IconButton>
            )}
          </>
        )}
      </td>
      <td
        className={css`
          max-width: 100px;
          width: 40%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {trackTitle}
      </td>
      <td
        className={css`
          max-width: 100px;
          width: 40%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        `}
      >
        {trackGroup.artist?.name}
      </td>
      <td>{track.audio?.duration && fmtMSS(track.audio.duration)}</td>
      <td align="right">
        <IconButton
          compact
          onClick={() => {
            navigator.clipboard.writeText(widgetUrl(track.id));
            snackbar("Copied track url", { type: "success" });
          }}
        >
          <FaLink />
        </IconButton>
      </td>
    </tr>
  );
};
export default TrackRow;
