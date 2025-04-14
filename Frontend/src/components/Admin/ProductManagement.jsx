import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/slice/adminProductSlice";
import OrderManagementShimmer from "./OrderManagementShimmer";
import OrderAndProductManagementShimmer from "./OrderManagementShimmer";
import { toast } from "sonner";
import DeleteModal from "./DeleteModal";

function ProductManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId,setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  function handleDelete(productId) {
    // if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId)).then(() => {
        toast.success("Product deleted!", { duration: 2000 });
      });
    // }
    setIsModalOpen(p=>!p);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup just in case
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);
  if (loading) return <OrderAndProductManagementShimmer name="Product" />;
  if (error) toast.error(error);


  return (
    <div className="max-w-7xl mx-auto p-1">
        {isModalOpen &&<DeleteModal onClose={()=>setIsModalOpen(p=>!p)} onDelete={()=>handleDelete(selectedId)}/>}
      <div className="flex items-center justify-between mb-5">
        <h2 className="sm:text-2xl font-bold text-lg">Product Management</h2>
        <Link
          to={`/admin/products/add`}
          className="bg-orange-500 hover:bg-orange-600 text-white sm:px-4 sm:py-2 px-3 py-1 rounded mr-2 cursor-pointer"
        >
          Add
        </Link>
      </div>
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">SKU</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="p-4">{product.price}</td>
                  <td className="p-4 text-nowrap">{product.sku}</td>
                  <td className="p-4 flex">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2 cursor-pointer"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={()=>{setIsModalOpen(p=>!p); setSelectedId(product._id)}}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500"></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
