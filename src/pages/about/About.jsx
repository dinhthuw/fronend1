import React from 'react'
import { FaBook, FaUsers, FaShippingFast, FaHeadset } from 'react-icons/fa'

const About = () => {
    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Chào mừng đến với Đỗ Ngọc Đình Books - nơi kết nối độc giả với những tác phẩm văn học tuyệt vời
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <FaBook className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Sách Chất Lượng</h3>
                        <p className="text-gray-600">Cung cấp những cuốn sách được chọn lọc kỹ lưỡng từ các nhà xuất bản uy tín</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <FaUsers className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Đội Ngũ Chuyên Nghiệp</h3>
                        <p className="text-gray-600">Đội ngũ nhân viên nhiệt tình, am hiểu sâu sắc về sách</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <FaShippingFast className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Giao Hàng Nhanh Chóng</h3>
                        <p className="text-gray-600">Cam kết giao hàng nhanh chóng và an toàn đến tay người đọc</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-md">
                        <FaHeadset className="text-4xl text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Hỗ Trợ 24/7</h3>
                        <p className="text-gray-600">Luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của khách hàng</p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-white rounded-lg shadow-md p-8 mb-16">
                    <h2 className="text-3xl font-bold mb-6">Câu Chuyện Của Chúng Tôi</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-gray-600 mb-4">
                                Đỗ Ngọc Đình Books được thành lập với sứ mệnh mang đến cho độc giả Việt Nam những tác phẩm văn học chất lượng cao. 
                                Chúng tôi tin rằng mỗi cuốn sách đều chứa đựng những giá trị văn hóa và tri thức quý báu.
                            </p>
                            <p className="text-gray-600">
                                Với hơn 10 năm kinh nghiệm trong ngành xuất bản, Đỗ Ngọc Đình Books đã trở thành điểm đến 
                                đáng tin cậy cho những độc giả yêu sách. Chúng tôi không ngừng nỗ lực để xây dựng một cộng đồng đọc sách sôi động, 
                                nơi mọi người có thể chia sẻ niềm đam mê đọc sách và khám phá những tác phẩm mới.
                            </p>
                        </div>
                        <div>
                            <img 
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop" 
                                alt="Đỗ Ngọc Đình Books Story" 
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    </div>
                </div>

                {/* Founder Section */}
                <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-16">
                    <h2 className="text-3xl font-bold mb-6 text-center">Người Sáng Lập</h2>
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="md:w-1/3 flex justify-center">
                            <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg">
                                <img 
                                    src="https://via.placeholder.com/200x200" 
                                    alt="Đỗ Ngọc Đình" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <h3 className="text-2xl font-semibold mb-2">Đỗ Ngọc Đình</h3>
                            <p className="text-gray-600 mb-4 italic">Nhà sáng lập & CEO</p>
                            <p className="text-gray-600 mb-4">
                                Với niềm đam mê sâu sắc về sách và văn học, Đỗ Ngọc Đình đã thành lập Đỗ Ngọc Đình Books 
                                với mong muốn xây dựng một không gian văn hóa đọc sôi động tại Việt Nam. 
                            </p>
                            <p className="text-gray-600">
                                "Sách là cầu nối giữa quá khứ và tương lai, là kho tàng trí tuệ của nhân loại. 
                                Mỗi cuốn sách là một cuộc hành trình, và tôi muốn mang những cuộc phiêu lưu tuyệt vời đó 
                                đến với độc giả Việt Nam."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="text-center bg-primary/5 rounded-lg p-8">
                    <h2 className="text-3xl font-bold mb-4">Sứ Mệnh Của Chúng Tôi</h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Đỗ Ngọc Đình Books cam kết mang đến cho độc giả những trải nghiệm đọc sách tuyệt vời nhất. 
                        Chúng tôi không chỉ bán sách, mà còn tạo ra một không gian văn hóa đọc sôi động, 
                        nơi mọi người có thể khám phá, học hỏi và phát triển bản thân thông qua việc đọc sách.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About 