export const Video: React.FC = () => {
  return (
    <video
      className="w-full bg-gray-200"
      src="videos/home.mp4"
      autoPlay
      loop
      muted
    />
  );
};
