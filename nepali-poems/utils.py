"""
utils
~~~~~~~~~~~~~~
Utility methods for working with different indic languages.
"""

import json

from langdetect import detect, lang_detect_exception
from lxml import html

def detect_lang(content):
    """ Concatenate the <p> text into one string and detect the language """

    text = " ".join(x.strip() for x in html.fromstring(content).xpath('//p/text()'))
    if not text.strip():
        text = " ".join(x.strip() for x in html.fromstring(content).xpath('//p/span/text()'))

    print("Text: " + text)
    try:
        return detect(text)
    except lang_detect_exception.LangDetectException:
        elem = {"Content": content, "Text": text}
        with open("sangraha-error.txt", "a") as f:
            f.write(json.dumps(elem))
        raise
