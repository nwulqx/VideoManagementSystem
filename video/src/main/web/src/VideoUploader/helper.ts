export class Uploader {
  chunks: any[] = [];

  constructor() {
    
  }

  getDeviceId(): Promise<string> {
    return navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
      });
      return devices[0]?.deviceId;
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });
  }

  useCamera(deviceId: string, callback: (stream: MediaStream) => void) {
    const videoConfig = deviceId ? { deviceId: { exact: deviceId } } : true;
    return navigator.mediaDevices.getUserMedia({ audio: false, video: videoConfig })
      .then(callback)
      .catch(function(err) {
        /* handle the error */
        console.error(err);
      });
  }

  getRecorder(stream: MediaStream, videoDom: HTMLVideoElement) {
    const mediaRecorder = new MediaRecorder(stream);
    let videoURL;

    mediaRecorder.onstop = (e) => {
      console.log("data available after MediaRecorder.stop() called.");

      console.log('chunks: ', this.chunks);
      const blob = new Blob(this.chunks, { type : 'video/webm' });
      this.chunks = [];
      videoURL = URL.createObjectURL(blob);
      videoDom.src = videoURL;
      console.log("recorder stopped");
    }

    mediaRecorder.ondataavailable = (e) => {
      this.chunks.push(e.data);
    }

    return mediaRecorder;
  }
}
