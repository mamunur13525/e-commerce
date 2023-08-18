import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'

const style = {
    header: 'font-semibold text-lg',
    details: 'text-md mb-3 lg:mb-5'
}

export default function Terms_Conditions() {
    const {header, details} = style
    return (
        <>
            <Navbar />
            <div className='px-3 mt-12 sm:px-12 md:px-20 lg:w-[1000px] lg:m-auto lg:mt-12'>
                <h1 className={header}>E-Commerce Terms and Conditions</h1>
                <p className={details}>Welcome to [Your E-Commerce Store Name]! Please read these terms and conditions carefully before using our website and making a purchase. By accessing and using our website, you agree to abide by these terms and conditions.</p>
                <h1 className={header}>1. Acceptance of Terms:</h1>
                <p className={details}>By using our website, you acknowledge that you have read, understood, and agree to these terms and conditions in their entirety. If you do not agree with any part of these terms, please refrain from using our website.</p>
                <h1 className={header}>2. Age Restriction:</h1>
                <p className={details}>By using our website, you confirm that you are at least [minimum age] years old or older. If you are under [minimum age], you must use our website under the supervision of a parent or legal guardian.</p>
                <h1 className={header}>3. Use of Website:</h1>
                <p className={details}>You may use our website for personal, non-commercial purposes only. You agree not to engage in any activity that disrupts or interferes with the functionality of the website or its services.</p>
                <h1 className={header}>4. Product Information:</h1>
                <p className={details}>We strive to provide accurate and up-to-date product information, including descriptions, prices, and availability. However, we do not guarantee the accuracy of this information and reserve the right to correct any errors or omissions.</p>
                <h1 className={header}>5. Intellectual Property:</h1>
                <p className={details}>All content on our website, including images, logos, text, and graphics, is protected by intellectual property laws. You are prohibited from using, copying, reproducing, or distributing any content without our explicit permission.</p>
                <h1 className={header}>6. Order Acceptance:</h1>
                <p className={details}>The receipt of an order confirmation does not signify our acceptance of your order. We reserve the right to cancel or refuse any order at our discretion, including due to pricing errors, product unavailability, or suspicion of fraudulent activity.</p>
                <h1 className={header}>7. Payment and Billing:</h1>
                <p className={details}>All payments are processed through secure and trusted payment gateways. By making a purchase, you agree to provide accurate and complete billing information. You are responsible for any additional charges, such as taxes or shipping fees.</p>
                <h1 className={header}>8. Shipping and Delivery:</h1>
                <p className={details}>We will make every effort to deliver your order within the estimated timeframe. However, we are not liable for delays caused by factors beyond our control, such as weather conditions or courier delays.</p>
                <h1 className={header}>9. Returns and Refunds:</h1>
                <p className={details}>Our returns and refunds policy is outlined separately on our website. Please refer to that policy for information on returning products, eligible items, and refund processes.</p>
                <h1 className={header}>10. Limitation of Liability:</h1>
                <p className={details}>We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website, products, or services.</p>
                <h1 className={header}>11. Changes of Terms snd Conditions:</h1>
                <p className={details}>We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website. It is your responsibility to review these terms regularly for updates.</p>
                <h1 className={header}>12. Governing Law:</h1>
                <p className={details}>These terms and conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising from the use of our website will be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].</p>
                <p className={details}>Thank you for choosing [Your E-Commerce Store Name]. If you have any questions or concerns about these terms and conditions, please contact us at [Your Contact Information].</p>
            </div>
            <Footer />
        </>
    )
}