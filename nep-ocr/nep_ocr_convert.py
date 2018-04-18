"""
    A simple script to run tessaract OCR with Python and system calls.
    
    * pull docker image: docker pull nripesh/tessseract4re-nep  

    * then run run_nep.sh

    * then run nep_orc.sh (which runs in the docker container) 

    * modify nep_orc.sh, and this script as you like for more features/results. 

    * I get pretty good results with tesseract 4.0 for pngs/jpegs. Pdf's still not good.

"""


import os 
import subprocess
import sys


# these have to be changed for different file types/formats
RESIZE_PCT = 200
DENSITY = 100
DEPTH = 8


def get_extension(file_name):
    return file_name.split('.')[-1][0]

def remove_extension(file_name):
    return ''.join(file_name.split('.')[:-1])

def split_folder_file(file_path):
    file_path_split = file_path.split('/')
    folder = '/'.join(file_path_split[:-1])
    file_name = file_path_split[-1]
    return folder, file_name

# TODO: support pdf's better
def convert_to_tif(img_path, resize_pct=RESIZE_PCT, density=DENSITY):
    # in some tutorial .tif seemed to be the most favored extension
    folder, img_name = split_folder_file(img_path)
    depth = DEPTH
    alpha = 'off'
    background = 'white'
    img_name_no_ext = img_name.split('.')[:-1][0]

    strip = True
    if strip:
        cmd = 'convert {} -resize {}%%  -density {} -depth {} ' \
              '-strip -background {} -alpha {} {}/{}.tif'.format(
                img_path, resize_pct, density, depth, 
                background, alpha, folder, img_name_no_ext)
    else:
        cmd = 'convert {} -resize {}%%  -density {} -depth {} ' \
              '{}/{}.tif'.format(img_path, resize_pct,
                density, depth, folder, img_name_no_ext)
    print(cmd)
    out = subprocess.run(cmd, stdout=subprocess.PIPE,
                         shell=True, check=True)
    print(out)
    
def convert_img_to_txt(img_path, lang='nep', oem=1, psm=3):
    folder, img_name = split_folder_file(img_path)
    img_no_ext = remove_extension(img_name)
    img_w_tif_ext = folder + '/' + img_no_ext + '.tif'
    
    # check if .tif, and convert if not converted already
    if get_extension(img_path) != 'tif':
        convert_to_tif(img_path)
        
    out_name = img_no_ext + '_' + lang + '_ocr'
    cmd = 'tesseract -l %s --oem %d --psm %d %s %s/%s' % \
                (lang, oem, psm, img_w_tif_ext, folder, out_name)
    out = subprocess.run(cmd, stdout=subprocess.PIPE,
                         shell=True, check=True)
    return out


# provide image path as argument
def main():
    assert len(sys.argv) > 1, 'provide image path'   
    img_src = os.path.abspath(sys.argv[1])

    # TODO: add more arguments as necessary 
    oem = 3
    lang = 'nep'
    psm = 1
    out = convert_img_to_txt(img_src, lang=lang, oem=oem, psm=psm)


if __name__ == "__main__":
    main()    
