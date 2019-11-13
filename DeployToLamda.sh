#!/bin/bash


cd ./trees-calculator
rm *.zip
zip -r foo.zip .
cd ..

cd ./google-distance-calculator
rm *.zip
zip -r foo.zip .
cd ..

#aws lambda update-function-code --function-name babs-backend --zip-file fileb://foo.zip

echo "Done"
