# cistup-final

# ps: to view the video click on demo-video.mp4 and click on view raw to download it
#use

step 1: clone the repository using git clone <url> in your pc

#optional but better as used yolo tiny model
step2: for better vehicle detection, install yolov3-spp from https://pjreddie.com/darknet/yolo/ both cfc and weights files in the dnn_model folder

step3: rename path in vehicle_detector.py file from dnn_model\yolov3-tiny.cfg to dnn_model\yolov3-spp.cfg and dnn_model\yolov3-tiny.weights to dnn_model\yolov3-spp.weights respectively.

step4: use pip install opencv,flask to download opencv and flask in terminal if not installed previously in device.

step5: in terminal cd over to flask backend folder and run python deploy.py to start the python model.

step5: cd over frontend folder by splitting terminal to powershell and type npm install in powershell to install frontend packages

