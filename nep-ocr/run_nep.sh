#!/bin/bash
docker run -dt --name t4re-nep tesseractshadow/tesseract4re-nep
docker ps -f name=t4re-nep