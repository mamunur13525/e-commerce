import { IKContext, IKUpload } from "imagekitio-react";
import  crypto from 'crypto';

export default function ImageUpload() {
    const onUploadStart = (evt) => {
        console.log('Started', evt);
    };
      
    const onUploadProgress = (evt) => {
        console.log('Progress: ', evt);
    };
    
    const onError = (err) => {
        console.log('Error');
        console.log(err);
    };
    
    const onSuccess = (res) => {
        console.log('Success');
        console.log(res);
    };


    // Your ImageKit API Secret
const apiSecret = 'private_ISvM6qaaDBDRWI/ghLkbGWuC22Q=';

// Generate a unique token for the request
const token = Date.now().toString();

// Calculate the expire timestamp (e.g., 1 hour from now)
const expireTimestamp = Math.floor(Date.now() / 1000) + 3600;
const signature = crypto
  .createHmac('sha1', apiSecret)
  .update(`${token}:${expireTimestamp}`)
  .digest('hex');


    return (
        <div>
            <IKContext 
                publicKey="public_oMtSciIGjj/z2sxDOGfO2y4i6zw="
                urlEndpoint="https://ik.imagekit.io/znex04bydzr"
                transformationPosition="path"
                authenticationEndpoint="http://localhost:5000/auth"
                authenticator={() => {
                    return new Promise((resolve, reject) => {
                      // Your logic to generate security parameters (signature, token, and expire) here
                      // You can use async operations here if needed
                      const apiSecret = 'private_izCjd5CX4N9PMXyij3FHS4fMshE=';

                      // Generate a unique token for the request
                      const token = 'public_oSTvOZ1m6vd3fl2zrtqZG6M9tjs=';

                      // Calculate the expire timestamp (e.g., 1 hour from now)
                      const expireTimestamp = Math.floor((Date.now() + 3600 * 1000) / 1000); // 3600 seconds in 1 hour

                      const signature = crypto
                          .createHmac('sha1', apiSecret)
                          .update(`${token}:${expireTimestamp}`)
                          .digest('hex');

                      const securityParameters = {
                        signature: signature,
                        token: token,
                        expire: expireTimestamp,
                      };
                  
                      if (securityParameters) {
                        resolve(securityParameters);
                      } else {
                        reject(new Error('Failed to generate security parameters'));
                      }
                    }); 
                  }}

            >
                <IKUpload
                    folder={"/team_e_commerce_products"}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadStart={onUploadStart}
                    onUploadProgress={onUploadProgress}
                />
            </IKContext>
        </div>
    )
}