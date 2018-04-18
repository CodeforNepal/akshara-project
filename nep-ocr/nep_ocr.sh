#!/bin/bash
DATA_DIR="data"
FILE_NAME="test2"
EXT="png"
OUT_EXT="_nep_ocr.txt"
echo "====== TASK started ======"
docker exec -it t4re-nep mkdir \-p ./$DATA_DIR/out
docker cp ./$DATA_DIR/$FILE_NAME.$EXT t4re-nep:/home/work/$DATA_DIR/out
docker cp ./nep.traineddata t4re-nep:/usr/share/tesseract-ocr/4.00/nep.traineddata
docker exec -it t4re-nep /bin/bash -c "mkdir -p /home/work/$DATA_DIR/out/"
docker cp ./nep_ocr_convert.py t4re-nep:/home/work/
docker exec -it t4re-nep /bin/bash -c "python3 nep_ocr_convert.py /home/work/$DATA_DIR/out/$FILE_NAME.$EXT"
docker cp t4re-nep:/home/work/$DATA_DIR/out/$FILE_NAME$OUT_EXT ./$DATA_DIR/$FILE_NAME$OUT_EXT
docker exec -it t4re-nep rm \-r ./$DATA_DIR/
