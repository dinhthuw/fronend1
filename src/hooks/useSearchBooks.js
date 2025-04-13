import { useState, useEffect } from "react";
import getBaseUrl from "../utils/baseURL";

export const useSearchBooks = (searchQuery) => {
    const [books, setBooks] = useState([]);  // Mặc định là mảng rỗng
    const [loading, setLoading] = useState(false); // Thêm loading
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (searchQuery.trim() === "") {
                setBooks([]); // Không tìm kiếm nếu searchQuery rỗng
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`${getBaseUrl()}/api/books?search=${searchQuery}`);
                const data = await response.json();
                setBooks(data);

                // Tạo danh sách gợi ý dựa trên kết quả tìm kiếm
                const bookSuggestions = data.map(book => ({
                    title: book.title,
                    author: book.author,
                    id: book._id
                }));
                setSuggestions(bookSuggestions);
            } catch (err) {
                setError(err.message);  // Lỗi khi lấy dữ liệu
            } finally {
                setLoading(false);
            }
        };

        // Thêm debounce để tránh gọi API quá nhiều
        const timeoutId = setTimeout(() => {
            fetchBooks();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]); // Chỉ gọi lại khi searchQuery thay đổi

    return { books, loading, error, suggestions };
};
