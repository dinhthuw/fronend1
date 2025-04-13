import React from 'react';

const InputField = ({ label, name, type = "text", placeholder, register, error }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === "textarea" ? (
                <textarea
                    {...register(name, { required: `Vui lòng nhập ${label.toLowerCase()}` })}
                    placeholder={placeholder}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:ring-blue-500`}
                    rows="3"
                />
            ) : (
                <input
                    {...register(name, { 
                        required: `Vui lòng nhập ${label.toLowerCase()}`,
                        min: type === "number" ? { value: 0, message: "Giá trị phải lớn hơn 0" } : undefined
                    })}
                    type={type}
                    placeholder={placeholder}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } focus:border-blue-500 focus:ring-blue-500`}
                />
            )}
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
};

export default InputField;