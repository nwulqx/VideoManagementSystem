import React, { useLayoutEffect, useState } from 'react';

import { Uploader } from './helper';

interface Props {

}

const VideoUpLoader: React.FC<Props> = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<any>();

  useLayoutEffect(() => {
    const uploader = new Uploader();

    uploader.getDeviceId().then((deviceId) => {
      uploader.useCamera(deviceId, (stream) => {
        const preview = document.querySelector<HTMLVideoElement>('#preview');
        const video = document.querySelector<HTMLVideoElement>('#video');

        preview.srcObject = stream;
        preview.onloadedmetadata = function(e) {
          preview.play();
        };

        setRecorder(uploader.getRecorder(stream, video));
      });
    });
  }, []);

  const handleToggle = () => {
    if (!recorder) return;

    if (recording) {
      recorder.stop();
      console.log(recorder.state);
      console.log("recorder stopped");
    } else {
      recorder.start();
      console.log(recorder.state);
      console.log("recorder started");
    }
    setRecording(!recording);
  }

  return (
    <div>
      <video id="preview" controls width={800} height={600}></video>
      <video id="video" controls width={800} height={600}></video>
      <div>
        <button onClick={handleToggle}>{recording ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  );
};

export default VideoUpLoader;
