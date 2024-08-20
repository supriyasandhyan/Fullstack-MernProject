import braintree from 'braintree'
import dotenv from 'dotenv'

dotenv.config();

const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
})

export const gatewayClientToken = async (req, res)=>{
    try {
        const responce = await gateway.clientToken.generate({});
        res.status(200).send({
            clientToken: responce.clientToken
        })
    } catch (error) {
        console.error("Failed to generate client token", error);
        res.status(500).send({
            error:"Failed to generate client token"
        })
    }
}

export const processPayment = async (req, res)=>{
    try {
        const { paymentMethodNonce, amount } = req.body;
        const saleRequest = {
            amount,
            paymentMethodNonce,
            options:{
                submitForSettlement: true,
            }
        }

        const result = await gateway.transaction.sale(saleRequest);

        if(result.success){
            res.status(200).send({
                success:"true",
                transaction: result.transaction
            })
        }else{
            res.status(500).send({
                error: result.message
            })
        }
    } catch (error) {
        console.error("Failed to process payment: ", error);
        res.status(500).send({
            error:"Failed to process payment: "
        })
    }
}