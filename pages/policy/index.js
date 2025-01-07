import Navbar from '../../components/Shared/Navbar/Navbar'
import Footer from '../../components/Shared/Footer/Footer'

const style = {
    header: 'font-semibold text-lg',
    details: 'text-md mb-3 lg:mb-5'
}

export default function Policy() {
    const {header, details} = style
    return (
        <>
            <Navbar />
            <div className='px-3 mt-12 sm:px-12 md:px-20 lg:w-[1000px] lg:m-auto lg:mt-12'>
                <h1 className={header}>E-Commerce Policy</h1>
                <p className={details}>Welcome to [Your E-Commerce Store Name]! We are committed to providing you with a seamless and secure online shopping experience. Please take a moment to review our e-commerce policies outlined below.</p>
                <h1 className={header}>1. Privacy and Security:</h1>
                <p className={details}>We value your privacy and employ strict measures to protect your personal and financial information. Our website uses secure encryption technology to ensure the confidentiality of your data.</p>
                <h1 className={header}>2. Payment Information:</h1>
                <p className={details}>We accept various payment methods, including credit/debit cards and online payment platforms. Your payment information is processed securely and is not stored on our servers.</p>
                <h1 className={header}>3. Order Confirmation:</h1>
                <p className={details}>Upon placing an order, you will receive an email confirming the details of your purchase. This email serves as your receipt and includes your order number, item(s) purchased, quantity, and total cost.</p>
                <h1 className={header}>4. Shipping:</h1>
                <p className={details}>We offer shipping to [geographical regions you serve]. Shipping costs and estimated delivery times are displayed during the checkout process. You will receive a shipping confirmation email with tracking information once your order has been dispatched.</p>
                <h1 className={header}>5. Returns and Refunds:</h1>
                <p className={details}>If you are not satisfied with your purchase, you may initiate a return within [number of days] days from the date of delivery. Please refer to our &quot;Returns and Refunds&quot; page on our website for detailed instructions on the return process and eligibility criteria.</p>
                <h1 className={header}>6. Product Availability:</h1>
                <p className={details}>Product availability is subject to change. If an item becomes out of stock after you have placed your order, we will notify you and provide options for a replacement or a refund.</p>
                <h1 className={header}>7. Product Descriptions:</h1>
                <p className={details}>We strive to provide accurate and detailed product descriptions, including images. However, variations in color, size, and appearance may occur due to monitor settings and other factors.</p>
                <h1 className={header}>8. Customer Support:</h1>
                <p className={details}>Our customer support team is available to assist you with any inquiries, concerns, or issues you may have. You can contact us through [contact methods], and we will respond as soon as possible.</p>
                <h1 className={header}>9. Intellectual Property:</h1>
                <p className={details}>All content on our website, including images, logos, and text, is protected by intellectual property laws. Any unauthorized use of our content is prohibited.</p>
                <h1 className={header}>10. Cookies:</h1>
                <p className={details}>We use cookies to enhance your browsing experience and gather information about your preferences. By using our website, you consent to our use of cookies as outlined in our Privacy Policy.</p>
                <h1 className={header}>11. Changes to Policies:</h1>
                <p className={details}>We reserve the right to modify our e-commerce policies at any time. Changes will be effective immediately upon posting on our website. We recommend checking our policies regularly for updates.</p>
                <p className={details}>Thank you for shopping with [Your E-Commerce Store Name]! If you have any questions or need further assistance, please don&apos;t hesitate to contact us.</p>
            </div>
            <Footer />
        </>
    )
}