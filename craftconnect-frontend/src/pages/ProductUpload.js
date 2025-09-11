import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const ProductUpload = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productData, setProductData] = useState({ name: '', price: '', description: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const categories = ['Jewelry', 'Textiles', 'Pottery', 'Woodcraft', 'Other'];

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedCategory) {
      alert('Please select a file and category');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('category', selectedCategory.toLowerCase());

      const response = await axios.post('/api/products/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        alert('Product uploaded successfully!');
        setProductData({ name: '', price: '', description: '' });
        setSelectedCategory('');
        setSelectedFile(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-text-primary">Product Upload</h2>

        <div className="bg-white rounded-lg p-8 mb-8 border-2 border-dashed border-border-color">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-text-primary">Upload Product Photos</h3>
            <p className="text-text-secondary mb-6">Upload clear product photos (JPG, PNG up to 5MB)</p>

            <div className="relative">
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold cursor-pointer hover:bg-primary-hover transition-colors">
                {selectedFile ? selectedFile.name : 'Upload'}
              </label>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-text-primary">Product Category</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg border font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-text-secondary border-border-color hover:border-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-text-primary">Product Details (Optional)</h3>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-primary">Product Name</label>
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-primary">Current Price</label>
            <input
              type="number"
              placeholder="Enter current price"
              className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-text-primary">Description</label>
            <textarea
              placeholder="Describe your product"
              rows={6}
              className="w-full px-4 py-3 border border-border-color rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              value={productData.description}
              onChange={(e) => setProductData({ ...productData, description: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-3 text-text-secondary font-medium hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
          <button onClick={handleUpload} disabled={isUploading} className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50">
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ProductUpload;



