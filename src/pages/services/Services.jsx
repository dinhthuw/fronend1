import React from 'react'
import { FaBookOpen, FaTruck, FaExchangeAlt, FaShoppingBag, FaUserFriends, FaBook } from 'react-icons/fa'

const Services = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Dịch Vụ Của Chúng Tôi</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Đỗ Ngọc Đình Books cung cấp các dịch vụ đa dạng để mang đến cho bạn trải nghiệm mua sắm và đọc sách tốt nhất
          </p>
        </div>

        {/* Main Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <FaBook className="text-5xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Đa dạng sách</h3>
            <p className="text-gray-600">
              Chúng tôi cung cấp đa dạng thể loại sách từ văn học, kinh tế, khoa học đến sách thiếu nhi, 
              đáp ứng nhu cầu của mọi độc giả.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <FaTruck className="text-5xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Giao hàng tận nơi</h3>
            <p className="text-gray-600">
              Dịch vụ giao hàng nhanh chóng, an toàn đến tận nhà với nhiều lựa chọn phương thức vận chuyển 
              phù hợp nhu cầu của bạn.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <FaExchangeAlt className="text-5xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Đổi trả linh hoạt</h3>
            <p className="text-gray-600">
              Chính sách đổi trả trong vòng 7 ngày kể từ khi nhận hàng nếu sách bị lỗi từ nhà sản xuất 
              hoặc trong quá trình vận chuyển.
            </p>
          </div>
        </div>

        {/* Special Services */}
        <div className="bg-gray-50 rounded-xl p-10 mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Dịch vụ đặc biệt</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaBookOpen className="text-2xl text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Đặt sách trước</h3>
                <p className="text-gray-600">
                  Đặt trước những cuốn sách sắp phát hành để được nhận ngay khi có hàng, 
                  kèm ưu đãi đặc biệt dành riêng cho khách hàng đặt trước.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaShoppingBag className="text-2xl text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Gói quà tặng</h3>
                <p className="text-gray-600">
                  Dịch vụ gói quà tinh tế, chuyên nghiệp với nhiều mẫu giấy gói và thiệp 
                  để bạn có thể tặng sách như một món quà ý nghĩa.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaUserFriends className="text-2xl text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Câu lạc bộ sách</h3>
                <p className="text-gray-600">
                  Tham gia câu lạc bộ sách của Đỗ Ngọc Đình Books để cùng chia sẻ, 
                  thảo luận và tham dự các buổi ra mắt sách cùng tác giả.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <FaBook className="text-2xl text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Tư vấn sách</h3>
                <p className="text-gray-600">
                  Đội ngũ chuyên gia sẵn sàng tư vấn, giới thiệu sách phù hợp với sở thích 
                  và nhu cầu của từng khách hàng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Trải nghiệm dịch vụ của chúng tôi ngay hôm nay</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Liên hệ với Đỗ Ngọc Đình Books để được tư vấn và sử dụng các dịch vụ của chúng tôi
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Liên hệ ngay
            </a>
            <a href="/books" className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Khám phá sách
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services 