#!/bin/bash


cd /DVLA-BOTATHON/trees-calculator
rm *.zip
zip -r foo.zip .
cd ..

aws lambda update-function-code --function-name babs-backend --zip-file fileb://index.zip

echo "Done"