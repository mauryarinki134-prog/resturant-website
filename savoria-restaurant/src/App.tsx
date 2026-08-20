/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturesBar } from './components/FeaturesBar';
import { OurStory } from './components/OurStory';
import { MenuCategories } from './components/MenuCategories';
import { ReservationBar } from './components/ReservationBar';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { StoryModal } from './components/StoryModal';
import { DishDetailModal } from './components/DishDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CanvasAnimation } from './components/CanvasAnimation';
import { MenuItem, CartItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationInitialData, setReservationInitialData] = useState<{
    date: string;
    time: string;
    guests: number;
  }>({
    date: '2026-08-19',
    time: '19:30',
    guests: 2,
  });

  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [inspectDish, setInspectDish] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Navigation smoothly scroll to target sections
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open reservation modal with prefilled data
  const handleOpenReservation = (data?: { date: string; time: string; guests: number }) => {
    if (data) {
      setReservationInitialData(data);
    }
    setIsReservationOpen(true);
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity = 1, notes = '') => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity, notes: notes || ci.notes }
            : ci
        );
      }
      return [...prev, { menuItem: item, quantity, notes }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.menuItem.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-transparent text-[#f2ede4] font-body flex flex-col selection:bg-[#d4a373] selection:text-black relative">
      <CanvasAnimation />
      {/* Top Navbar */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content matching the provided design */}
      <main className="flex-grow">
        {/* Hero Section: Welcome to Savoria | Good Food Good Mood */}
        <Hero
          onExploreMenu={() => handleNavigate('categories')}
          onOpenStoryModal={() => setIsStoryOpen(true)}
        />

        {/* 4 Feature Columns Bar: DELICIOUS FOOD | EXPERT CHEFS | COZY AMBIENCE | QUALITY SERVICE */}
        <FeaturesBar />

        {/* Our Story Section: A Passion For Flavor A Love For People */}
        <OurStory onOpenStoryModal={() => setIsStoryOpen(true)} />

        {/* Menu Categories: PIZZA | BURGERS | PASTA | SALADS | DESSERTS | DRINKS */}
        <MenuCategories
          selectedCategory={selectedCategory}
          onSelectCategory={(catId) => setSelectedCategory(catId)}
          onAddToCart={handleAddToCart}
          onViewItem={(item) => setInspectDish(item)}
        />

        {/* Reservation Banner: Book Your Table | Make A Reservation */}
        <ReservationBar onOpenReservationModal={handleOpenReservation} />

        {/* Contact & Location Details */}
        <ContactSection />
      </main>

      {/* Footer: SAVORIA RESTAURANT, Links, Menu, Contact, Newsletter */}
      <Footer
        onNavigate={handleNavigate}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Interactive Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialData={reservationInitialData}
      />

      {/* Our Story Video & Narrative Modal */}
      <StoryModal
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        onOpenReservation={() => {
          setIsStoryOpen(false);
          setIsReservationOpen(true);
        }}
      />

      {/* Dish Detail & Customization Modal */}
      <DishDetailModal
        item={inspectDish}
        onClose={() => setInspectDish(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-out Order Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenReservation={() => {
          setIsCartOpen(false);
          setIsReservationOpen(true);
        }}
      />
    </div>
  );
}
