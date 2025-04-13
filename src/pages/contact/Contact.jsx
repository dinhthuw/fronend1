import React, { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage({
        type: 'success',
        text: 'Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất!'
      })
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    }, 1500)
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Liên Hệ Với Chúng Tôi</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Đỗ Ngọc Đình Books luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi nếu bạn có bất kỳ câu hỏi hoặc đề xuất nào.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-primary w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-medium">Địa Chỉ</h3>
                    <p className="text-gray-600 mt-1">123 Đường Sách, Quận 1, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaPhone className="text-primary w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-medium">Điện Thoại</h3>
                    <p className="text-gray-600 mt-1">+84 28 1234 5678</p>
                    <p className="text-gray-600">Hotline: 1900 1234</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaEnvelope className="text-primary w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-medium">Email</h3>
                    <p className="text-gray-600 mt-1">info@dongocdinh-books.com</p>
                    <p className="text-gray-600">support@dongocdinh-books.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <FaClock className="text-primary w-5 h-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-gray-900 font-medium">Giờ Làm Việc</h3>
                    <p className="text-gray-600 mt-1">Thứ 2 - Thứ 6: 8:00 - 20:00</p>
                    <p className="text-gray-600">Thứ 7 - Chủ Nhật: 9:00 - 18:00</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-gray-900 font-medium mb-4">Kết Nối Với Chúng Tôi</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <FaFacebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <FaTwitter className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-600 hover:text-primary transition-colors">
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Gửi Tin Nhắn Cho Chúng Tôi</h2>
              
              {submitMessage && (
                <div className={`p-4 mb-6 rounded-md ${submitMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {submitMessage.text}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Họ và Tên</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Tiêu Đề</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Tin Nhắn</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Gửi Tin Nhắn'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Map */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 px-4">Bản Đồ</h2>
          <div className="rounded-lg overflow-hidden h-96">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5177580035965!2d106.69906121471855!3d10.771604992323728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4670702e31%3A0xa5777fb3a5bb9972!2sNguy%E1%BB%85n%20Hu%E1%BB%87%20Walking%20Street!5e0!3m2!1sen!2s!4v1585587654017!5m2!1sen!2s" 
              width="100%" 
              height="100%" 
              frameBorder="0"
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
              title="Đỗ Ngọc Đình Books Location"
              className="border-0"
            ></iframe>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Câu Hỏi Thường Gặp</h2>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            <div className="py-5">
              <h3 className="text-lg font-medium text-gray-900">Làm thế nào để đặt sách trực tuyến?</h3>
              <p className="mt-2 text-gray-600">
                Bạn có thể đặt sách trực tuyến thông qua website của chúng tôi. Chọn sách bạn muốn mua, thêm vào giỏ hàng và tiến hành thanh toán.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-lg font-medium text-gray-900">Phí vận chuyển được tính như thế nào?</h3>
              <p className="mt-2 text-gray-600">
                Phí vận chuyển được tính dựa trên vị trí giao hàng và tổng giá trị đơn hàng. Đơn hàng trên 500.000đ sẽ được miễn phí vận chuyển trong nội thành.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-lg font-medium text-gray-900">Tôi có thể trả lại sách đã mua không?</h3>
              <p className="mt-2 text-gray-600">
                Bạn có thể trả lại sách trong vòng 7 ngày kể từ ngày nhận hàng nếu sách bị lỗi từ nhà sản xuất hoặc bị hư hỏng trong quá trình vận chuyển.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 