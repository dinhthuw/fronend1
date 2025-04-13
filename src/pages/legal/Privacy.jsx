import React from 'react'

const Privacy = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-200">Chính Sách Bảo Mật</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-gray-600">
            Đỗ Ngọc Đình Books coi trọng việc bảo vệ thông tin cá nhân và cam kết bảo mật thông tin của khách hàng. 
            Chính sách bảo mật này nhằm giúp bạn hiểu cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">1. Thông tin chúng tôi thu thập</h2>
          <p className="mb-4 text-gray-600">
            Khi bạn đăng ký tài khoản, mua sách hoặc liên hệ với chúng tôi, chúng tôi có thể thu thập các thông tin sau:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Thông tin cá nhân: Họ tên, địa chỉ email, số điện thoại, địa chỉ giao hàng</li>
            <li>Thông tin giao dịch: Lịch sử mua hàng, thanh toán</li>
            <li>Thông tin thiết bị: Loại thiết bị, trình duyệt, địa chỉ IP</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">2. Mục đích sử dụng thông tin</h2>
          <p className="mb-4 text-gray-600">
            Chúng tôi sử dụng thông tin cá nhân của bạn cho các mục đích sau:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Xử lý đơn hàng và giao sách</li>
            <li>Cung cấp dịch vụ hỗ trợ khách hàng</li>
            <li>Gửi thông báo về đơn hàng hoặc tài khoản của bạn</li>
            <li>Gửi các thông tin về sách mới, khuyến mãi (nếu bạn đăng ký nhận)</li>
            <li>Cải thiện chất lượng dịch vụ và trải nghiệm người dùng</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">3. Bảo vệ thông tin</h2>
          <p className="mb-6 text-gray-600">
            Đỗ Ngọc Đình Books cam kết bảo vệ thông tin cá nhân của bạn. Chúng tôi áp dụng các biện pháp bảo mật 
            kỹ thuật và hành chính phù hợp để bảo vệ thông tin cá nhân khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">4. Chia sẻ thông tin</h2>
          <p className="mb-4 text-gray-600">
            Chúng tôi có thể chia sẻ thông tin cá nhân của bạn trong các trường hợp sau:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Với các đối tác vận chuyển để giao hàng cho bạn</li>
            <li>Với các đối tác thanh toán để xử lý giao dịch</li>
            <li>Khi có yêu cầu từ cơ quan pháp luật hoặc theo quy định của pháp luật</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">5. Quyền của bạn</h2>
          <p className="mb-4 text-gray-600">
            Bạn có quyền:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-600">
            <li>Truy cập thông tin cá nhân của bạn</li>
            <li>Yêu cầu cập nhật hoặc điều chỉnh thông tin không chính xác</li>
            <li>Yêu cầu xóa thông tin cá nhân (trong giới hạn cho phép của pháp luật)</li>
            <li>Từ chối nhận email tiếp thị từ chúng tôi</li>
          </ul>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">6. Cookies</h2>
          <p className="mb-6 text-gray-600">
            Website của chúng tôi sử dụng cookies để cải thiện trải nghiệm của bạn. Cookies là các tệp nhỏ được 
            lưu trữ trên thiết bị của bạn, giúp website ghi nhớ thông tin đăng nhập, lựa chọn ngôn ngữ và 
            các tùy chọn khác của bạn.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">7. Thay đổi chính sách bảo mật</h2>
          <p className="mb-6 text-gray-600">
            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Bất kỳ thay đổi nào sẽ được đăng 
            trên trang web của chúng tôi và ngày cập nhật sẽ được thay đổi. Chúng tôi khuyến khích bạn kiểm tra 
            chính sách này định kỳ để biết cách chúng tôi bảo vệ thông tin của bạn.
          </p>
          
          <h2 className="text-2xl font-bold mt-10 mb-4">8. Liên hệ</h2>
          <p className="mb-6 text-gray-600">
            Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ:
          </p>
          <p className="mb-6 text-gray-600">
            <strong>Đỗ Ngọc Đình Books</strong><br />
            Địa chỉ: 123 Đường Sách, Quận 1, TP. Hồ Chí Minh<br />
            Email: privacy@dongocdinh-books.com<br />
            Điện thoại: 1900 1234
          </p>
          
          <p className="mt-10 text-gray-500 text-sm">
            Cập nhật lần cuối: Ngày 30 tháng 3 năm 2023
          </p>
        </div>
      </div>
    </div>
  )
}

export default Privacy 