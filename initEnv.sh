#!/bin/bash

pip3 install virtualenv

virtualenv venv
printf "Initialized Python Virtual Environment \n"

. venv/bin/activate
pip3 install nodeenv
pip3 install -r requirements.txt
printf "Installed Python requirements.txt \n"

deactivate
. venv/bin/activate

nodeenv -p
printf "Initialized Node Virtual Environment \n"

deactivate
. venv/bin/activate

npm --prefix ./frontend install ./frontend
printf "Installed Node package.json \n"


# npm --prefix ./frontend