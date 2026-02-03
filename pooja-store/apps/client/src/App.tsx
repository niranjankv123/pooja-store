import React from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LoginModal } from './components/LoginModal';
import { AddProductModal } from './components/AddProductModal';
import { EditProductModal } from './components/EditProductModal';
import { useProducts } from './hooks/useProducts';
import { useCart } from './hooks/useCart';
import { useAdmin } from './hooks/useAdmin';
import { type Product } from './types';

const App: React.FC = () => {
  const {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();

  const {
    cart,
    total,
    isCartOpen,
    isCheckoutModalOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    openCheckout,
    closeCheckout,
    handleCheckout
  } = useCart();

  const {
    isAdminLoggedIn,
    isLoginModalOpen,
    login,
    logout,
    openLoginModal,
    closeLoginModal
  } = useAdmin();

  const [isAddProductModalOpen, setIsAddProductModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

  return (
    <div className="app">
      <Header
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        isAdminLoggedIn={isAdminLoggedIn}
        onLoginClick={openLoginModal}
        onLogoutClick={logout}
        onAddProductClick={() => setIsAddProductModalOpen(true)}
      />

      <section className="hero">
        <div className="container">
          <h1>Bring Divinity Home</h1>
          <p>Handpicked premium pooja essentials for your sacred space.</p>
        </div>
      </section>

      <main className="container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>Loading products...</div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                isAdmin={isAdminLoggedIn}
                onEdit={setEditingProduct}
                onDelete={deleteProduct}
              />
            ))}
          </div>
        )}
      </main>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        total={total}
        onCheckout={openCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={closeCheckout}
        onConfirm={handleCheckout}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={login}
      />

      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAdd={addProduct}
      />

      <EditProductModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        product={editingProduct}
        onUpdate={updateProduct}
      />

      <footer style={{ background: '#2d2d2d', color: 'white', padding: '3rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ opacity: 0.7 }}>&copy; 2025 Divine Pooja Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

