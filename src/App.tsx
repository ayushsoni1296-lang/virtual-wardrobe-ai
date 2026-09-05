/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ScreenId,
  MainTab,
  ClothingItem,
  SavedOutfit,
  OccasionType,
  ClothingCategory,
} from './types';
import {
  INITIAL_CLOTHING_ITEMS,
  INITIAL_SAVED_OUTFITS,
} from './data/mockData';
import { api, HealthStatus } from './services/api';
import { ShowcaseHeader } from './components/ShowcaseHeader';
import { SplashScreen } from './components/screens/SplashScreen';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { SignUpScreen } from './components/screens/SignUpScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { WardrobeScreen } from './components/screens/WardrobeScreen';
import { CategoryTopsScreen } from './components/screens/CategoryTopsScreen';
import { AddClothingModal } from './components/screens/AddClothingModal';
import { CameraGalleryScreen } from './components/screens/CameraGalleryScreen';
import { AiProcessingScreen } from './components/screens/AiProcessingScreen';
import { ConfirmClothingScreen } from './components/screens/ConfirmClothingScreen';
import { ClothingDetailsScreen } from './components/screens/ClothingDetailsScreen';
import { AiStylistScreen } from './components/screens/AiStylistScreen';
import { OutfitResultScreen } from './components/screens/OutfitResultScreen';
import { SavedOutfitsScreen } from './components/screens/SavedOutfitsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { EditClothingScreen } from './components/screens/EditClothingScreen';
import { DeleteConfirmationModal } from './components/screens/DeleteConfirmationModal';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { EmptyStateScreen } from './components/screens/EmptyStateScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [deviceMode, setDeviceMode] = useState<'frame' | 'fullscreen'>('frame');
  const [items, setItems] = useState<ClothingItem[]>(INITIAL_CLOTHING_ITEMS);
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(INITIAL_SAVED_OUTFITS);
  const [selectedItem, setSelectedItem] = useState<ClothingItem>(INITIAL_CLOTHING_ITEMS[0]);
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType>('Casual');
  const [backendStatus, setBackendStatus] = useState<HealthStatus | null>(null);
  const [aiOutfitData, setAiOutfitData] = useState<{
    title: string;
    reason: string;
    items: ClothingItem[];
  } | null>(null);

  // Sync initial state from backend database on mount
  useEffect(() => {
    const fetchBackendData = async () => {
      try {
        const [health, backendItems, backendOutfits] = await Promise.all([
          api.checkHealth(),
          api.getWardrobe(),
          api.getSavedOutfits(),
        ]);
        if (health) setBackendStatus(health);
        if (backendItems && backendItems.length > 0) {
          setItems(backendItems);
          setSelectedItem(backendItems[0]);
        }
        if (backendOutfits && backendOutfits.length > 0) {
          setSavedOutfits(backendOutfits);
        }
      } catch (error) {
        console.warn('Backend sync fallback to local cache', error);
      }
    };
    fetchBackendData();
  }, []);

  // Toggle favorite status on an item
  const handleToggleFavorite = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  // Reset data to initial default via backend
  const handleResetData = async () => {
    try {
      await api.resetBackend();
      const [backendItems, backendOutfits] = await Promise.all([
        api.getWardrobe(),
        api.getSavedOutfits(),
      ]);
      setItems(backendItems.length > 0 ? backendItems : INITIAL_CLOTHING_ITEMS);
      setSavedOutfits(backendOutfits.length > 0 ? backendOutfits : INITIAL_SAVED_OUTFITS);
      setSelectedItem(backendItems[0] || INITIAL_CLOTHING_ITEMS[0]);
    } catch {
      setItems(INITIAL_CLOTHING_ITEMS);
      setSavedOutfits(INITIAL_SAVED_OUTFITS);
      setSelectedItem(INITIAL_CLOTHING_ITEMS[0]);
    }
    setCurrentScreen('home');
  };

  // Switch tabs from bottom navigation
  const handleNavigateTab = (tab: MainTab) => {
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'wardrobe':
        setCurrentScreen('wardrobe');
        break;
      case 'ai_stylist':
        setCurrentScreen('ai_stylist');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  // Save updated clothing item from edit screen (sync with backend)
  const handleSaveEditedItem = async (updatedItem: ClothingItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setSelectedItem(updatedItem);
    setCurrentScreen('clothing_details');

    try {
      await api.updateClothingItem(updatedItem.id, updatedItem);
    } catch (err) {
      console.error('Failed to sync item update to backend:', err);
    }
  };

  // Delete confirmed item (sync with backend)
  const handleDeleteItem = async () => {
    const itemToDeleteId = selectedItem.id;
    setItems((prev) => prev.filter((item) => item.id !== itemToDeleteId));
    setCurrentScreen('wardrobe');

    try {
      await api.deleteClothingItem(itemToDeleteId);
    } catch (err) {
      console.error('Failed to delete item from backend:', err);
    }
  };

  // Add new clothing item from confirm screen (sync with backend)
  const handleAddConfirmedItem = async (newItemData: Partial<ClothingItem>) => {
    try {
      const added = await api.addClothingItem(newItemData);
      setItems((prev) => [added, ...prev]);
      setSelectedItem(added);
    } catch {
      const fallbackItem: ClothingItem = {
        id: `item-${Date.now()}`,
        name: newItemData.name || 'New Added Item',
        category: (newItemData.category as ClothingCategory) || 'Tops',
        subCategory: (newItemData.subCategory as any) || 'Shirts',
        color: newItemData.color || 'Blue',
        style: newItemData.style || 'Casual',
        season: newItemData.season || 'All Season',
        gender: newItemData.gender || 'Men',
        image:
          newItemData.image ||
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop&q=80',
        isFavorite: false,
        dateAdded: new Date().toISOString().split('T')[0],
      };
      setItems((prev) => [fallbackItem, ...prev]);
      setSelectedItem(fallbackItem);
    }
    setCurrentScreen('wardrobe');
  };

  // Save outfit to saved outfits collection (sync with backend)
  const handleSaveOutfit = async (outfitData: {
    name: string;
    description: string;
    occasion: string;
    items: ClothingItem[];
  }) => {
    try {
      const saved = await api.saveOutfit(
        outfitData.occasion,
        outfitData.name,
        outfitData.description,
        outfitData.items.map((i) => i.id)
      );
      setSavedOutfits((prev) => [saved, ...prev]);
    } catch {
      const fallbackOutfit: SavedOutfit = {
        id: `outfit-${Date.now()}`,
        name: outfitData.name,
        description: outfitData.description,
        occasion: outfitData.occasion,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: outfitData.items,
      };
      setSavedOutfits((prev) => [fallbackOutfit, ...prev]);
    }
    setCurrentScreen('saved_outfits');
  };

  // Handle AI Outfit Generation (Server-Side AI reasoning over actual wardrobe)
  const handleSuggestOutfit = async (occasion: OccasionType) => {
    setSelectedOccasion(occasion);
    try {
      const res = await api.generateOutfit(occasion);
      if (res && res.items.length > 0) {
        setAiOutfitData({
          title: res.title,
          reason: res.reason,
          items: res.items,
        });
      }
    } catch (err) {
      console.warn('AI Stylist fallback to client matching:', err);
      setAiOutfitData(null);
    }
    setCurrentScreen('outfit_result');
  };

  // Render the currently active screen component
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={() => setCurrentScreen('welcome')} />;

      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('signup')}
            onLogin={() => setCurrentScreen('login')}
          />
        );

      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={() => setCurrentScreen('home')}
            onGoToSignUp={() => setCurrentScreen('signup')}
          />
        );

      case 'signup':
        return (
          <SignUpScreen
            onSignUpSuccess={() => setCurrentScreen('home')}
            onGoToLogin={() => setCurrentScreen('login')}
            onBack={() => setCurrentScreen('welcome')}
          />
        );

      case 'home':
        return (
          <HomeScreen
            items={items}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setCurrentScreen('clothing_details');
            }}
            onToggleFavorite={handleToggleFavorite}
            onSuggestOutfit={() => setCurrentScreen('ai_stylist')}
            onViewAllWardrobe={() => setCurrentScreen('wardrobe')}
            onAddClothing={() => setCurrentScreen('add_clothing')}
            onNavigateTab={handleNavigateTab}
            onOpenProfile={() => setCurrentScreen('profile')}
          />
        );

      case 'wardrobe':
        return (
          <WardrobeScreen
            items={items}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setCurrentScreen('clothing_details');
            }}
            onToggleFavorite={handleToggleFavorite}
            onSelectCategory={(cat) => {
              if (cat === 'Tops') setCurrentScreen('category_tops');
            }}
            onAddClothing={() => setCurrentScreen('add_clothing')}
            onNavigateTab={handleNavigateTab}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'category_tops':
        return (
          <CategoryTopsScreen
            items={items}
            onSelectItem={(item) => {
              setSelectedItem(item);
              setCurrentScreen('clothing_details');
            }}
            onToggleFavorite={handleToggleFavorite}
            onAddClothing={() => setCurrentScreen('add_clothing')}
            onNavigateTab={handleNavigateTab}
            onBack={() => setCurrentScreen('wardrobe')}
          />
        );

      case 'add_clothing':
        return (
          <AddClothingModal
            onTakePhoto={() => setCurrentScreen('camera_gallery')}
            onChooseGallery={() => setCurrentScreen('camera_gallery')}
            onCancel={() => setCurrentScreen('wardrobe')}
          />
        );

      case 'camera_gallery':
        return (
          <CameraGalleryScreen
            onCapture={() => setCurrentScreen('ai_processing')}
            onBack={() => setCurrentScreen('add_clothing')}
          />
        );

      case 'ai_processing':
        return (
          <AiProcessingScreen
            onComplete={() => setCurrentScreen('confirm_clothing')}
          />
        );

      case 'confirm_clothing':
        return (
          <ConfirmClothingScreen
            onConfirm={handleAddConfirmedItem}
            onBack={() => setCurrentScreen('camera_gallery')}
          />
        );

      case 'clothing_details':
        return (
          <ClothingDetailsScreen
            item={selectedItem}
            onEdit={() => setCurrentScreen('edit_clothing')}
            onDelete={() => setCurrentScreen('delete_confirmation')}
            onBack={() => setCurrentScreen('wardrobe')}
          />
        );

      case 'ai_stylist':
        return (
          <AiStylistScreen
            onSuggestOutfit={handleSuggestOutfit}
            onBack={() => setCurrentScreen('home')}
          />
        );

      case 'outfit_result':
        return (
          <OutfitResultScreen
            occasion={selectedOccasion}
            items={items}
            outfitData={aiOutfitData}
            onTryAnother={() => {
              handleSuggestOutfit(selectedOccasion);
            }}
            onSaveOutfit={handleSaveOutfit}
            onBack={() => setCurrentScreen('ai_stylist')}
          />
        );

      case 'saved_outfits':
        return (
          <SavedOutfitsScreen
            outfits={savedOutfits}
            onSelectOutfit={(outfit) => {
              if (outfit.items.length > 0) {
                setSelectedItem(outfit.items[0]);
                setCurrentScreen('clothing_details');
              }
            }}
            onNavigateTab={handleNavigateTab}
            onBack={() => setCurrentScreen('profile')}
          />
        );

      case 'profile':
        return (
          <ProfileScreen
            wardrobeCount={items.length}
            savedOutfitsCount={savedOutfits.length}
            onOpenWardrobe={() => setCurrentScreen('wardrobe')}
            onOpenSavedOutfits={() => setCurrentScreen('saved_outfits')}
            onOpenSettings={() => setCurrentScreen('settings')}
            onLogout={() => setCurrentScreen('login')}
            onNavigateTab={handleNavigateTab}
          />
        );

      case 'edit_clothing':
        return (
          <EditClothingScreen
            item={selectedItem}
            onSave={handleSaveEditedItem}
            onBack={() => setCurrentScreen('clothing_details')}
          />
        );

      case 'delete_confirmation':
        return (
          <DeleteConfirmationModal
            itemName={selectedItem.name}
            onConfirmDelete={handleDeleteItem}
            onCancel={() => setCurrentScreen('clothing_details')}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onBack={() => setCurrentScreen('profile')}
            onNavigateTab={handleNavigateTab}
          />
        );

      case 'empty_state':
        return (
          <EmptyStateScreen
            onAddClothing={() => setCurrentScreen('add_clothing')}
            onNavigateTab={handleNavigateTab}
          />
        );

      default:
        return <HomeScreen items={items} onSelectItem={() => {}} onToggleFavorite={() => {}} onSuggestOutfit={() => {}} onViewAllWardrobe={() => {}} onAddClothing={() => {}} onNavigateTab={handleNavigateTab} onOpenProfile={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-start text-slate-900 selection:bg-indigo-600 selection:text-white">
      {/* Top Interactive Showcase Navigator */}
      <ShowcaseHeader
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        deviceMode={deviceMode}
        onChangeDeviceMode={setDeviceMode}
        onResetData={handleResetData}
        backendStatus={backendStatus}
      />

      {/* Main Showcase Canvas / Simulator Area */}
      <main className="w-full flex-1 flex items-center justify-center p-3 sm:p-6 overflow-hidden relative">
        {/* Subtle Ambient Background Glow */}
        <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {deviceMode === 'frame' ? (
          /* Realistic iPhone Frame (390 x 844) */
          <div className="relative w-[390px] h-[844px] max-h-[92vh] max-w-[95vw] rounded-[52px] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-300/80 shadow-slate-400/30 flex flex-col">
            {/* Outer Metal Bezel Highlights */}
            <div className="absolute inset-0 rounded-[52px] pointer-events-none border border-slate-700/50" />

            {/* Side hardware buttons (subtle) */}
            <div className="absolute -left-1.5 top-28 w-1 h-12 bg-slate-700 rounded-l-xs" />
            <div className="absolute -left-1.5 top-44 w-1 h-12 bg-slate-700 rounded-l-xs" />
            <div className="absolute -right-1.5 top-36 w-1 h-16 bg-slate-700 rounded-r-xs" />

            {/* Inner Screen Container */}
            <div className="relative w-full h-full rounded-[42px] bg-[#F8FAFC] overflow-hidden flex flex-col shadow-inner">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-40 flex items-center justify-between px-3 pointer-events-none shadow-xs">
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-slate-800" />
                <div className="w-3 h-3 rounded-full bg-[#111] ring-1 ring-slate-800 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-900/60" />
                </div>
              </div>

              {/* Active Screen View with Motion Transitions */}
              <div className="flex-1 w-full h-full overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="w-full h-full"
                  >
                    {renderScreen()}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home Indicator Bar */}
              <div className="absolute bottom-1 left-0 right-0 h-4 flex items-center justify-center pointer-events-none z-30">
                <div className="w-32 h-1 bg-slate-400/60 rounded-full" />
              </div>
            </div>
          </div>
        ) : (
          /* Fullscreen Mobile View */
          <div className="w-full max-w-[440px] h-[92vh] rounded-3xl bg-[#F8FAFC] overflow-hidden shadow-xl flex flex-col relative ring-1 ring-slate-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="w-full h-full"
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
