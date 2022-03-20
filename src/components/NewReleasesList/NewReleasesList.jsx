import NewReleasesListTrack from "../NewReleasesListTrack/NewReleasesListTrack";

function AudioList({ name, handleModal }) {
  return (
    <div className={name}>
      <NewReleasesListTrack
        handleModal={handleModal}
      />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
      <NewReleasesListTrack />
    </div>
  );
}

export default AudioList;
