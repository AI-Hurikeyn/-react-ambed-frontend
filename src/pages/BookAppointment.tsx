import React, { useState } from 'react';

// Simple icon components (replace with your preferred icon library)
const ChevronDownIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const PlusIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const TrashIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const CalculatorIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const FileTextIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const UploadIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

// Types
interface Room {
  id: string;
  name: string;
  shape: 'rectangle' | 'square' | 'circle' | 'triangle' | 'custom';
  dimensions: Record<string, number>;
  openings: {
    doors: number;
    windows: number;
  };
  customWalls?: Array<{ width: number; height: number }>;
  calculations?: {
    floorArea: number;
    perimeter: number;
    wallArea: number;
    wallAreaAfter: number;
    roofArea: number;
    wallsPrice: number;
    roofPrice: number;
    subtotal: number;
  };
}

interface Rates {
  wallRate: number;
  roofRate: number;
  currency: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Constants
const DEFAULT_RATES: Rates = {
  wallRate: 20.0,
  roofRate: 7.0,
  currency: 'DNT'
};

const DEFAULT_WALL_HEIGHT = 2.8;

// Calculation utilities
const calculateRoom = (room: Room, rates: Rates): Room => {
  let floorArea = 0;
  let perimeter = 0;
  
  const { shape, dimensions } = room;
  
  switch (shape) {
    case 'rectangle':
      floorArea = dimensions.length * dimensions.width;
      perimeter = 2 * (dimensions.length + dimensions.width);
      break;
    case 'square':
      floorArea = dimensions.side * dimensions.side;
      perimeter = 4 * dimensions.side;
      break;
    case 'circle':
      floorArea = Math.PI * dimensions.radius * dimensions.radius;
      perimeter = 2 * Math.PI * dimensions.radius;
      break;
    case 'triangle':
      if (dimensions.base && dimensions.height) {
        floorArea = 0.5 * dimensions.base * dimensions.height;
        // Estimate perimeter for isosceles triangle
        const sideLength = Math.sqrt((dimensions.base/2) ** 2 + dimensions.height ** 2);
        perimeter = dimensions.base + 2 * sideLength;
      }
      break;
    case 'custom':
      if (room.customWalls) {
        const wallArea = room.customWalls.reduce((sum, wall) => sum + (wall.width * wall.height), 0);
        const openingsArea = room.openings.doors + room.openings.windows;
        const wallAreaAfter = Math.max(0, wallArea - openingsArea);
        const roofArea = dimensions.area || floorArea;
        
        return {
          ...room,
          calculations: {
            floorArea: dimensions.area || 0,
            perimeter: 0,
            wallArea,
            wallAreaAfter,
            roofArea,
            wallsPrice: wallAreaAfter * rates.wallRate,
            roofPrice: roofArea * rates.roofRate,
            subtotal: (wallAreaAfter * rates.wallRate) + (roofArea * rates.roofRate)
          }
        };
      }
      break;
  }
  
  const wallHeight = dimensions.wallHeight || DEFAULT_WALL_HEIGHT;
  const wallArea = perimeter * wallHeight;
  const openingsArea = room.openings.doors + room.openings.windows;
  const wallAreaAfter = Math.max(0, wallArea - openingsArea);
  const roofArea = dimensions.roofArea || floorArea;
  
  const wallsPrice = wallAreaAfter * rates.wallRate;
  const roofPrice = roofArea * rates.roofRate;
  const subtotal = wallsPrice + roofPrice;
  
  return {
    ...room,
    calculations: {
      floorArea: Math.round(floorArea * 100) / 100,
      perimeter: Math.round(perimeter * 100) / 100,
      wallArea: Math.round(wallArea * 100) / 100,
      wallAreaAfter: Math.round(wallAreaAfter * 100) / 100,
      roofArea: Math.round(roofArea * 100) / 100,
      wallsPrice: Math.round(wallsPrice * 100) / 100,
      roofPrice: Math.round(roofPrice * 100) / 100,
      subtotal: Math.round(subtotal * 100) / 100
    }
  };
};

// Components
const ModeToggle: React.FC<{
  mode: 'automatic' | 'manual';
  onModeChange: (mode: 'automatic' | 'manual') => void;
  hasUnsavedData: boolean;
}> = ({ mode, onModeChange, hasUnsavedData }) => {
  const handleModeChange = (newMode: 'automatic' | 'manual') => {
    if (hasUnsavedData && mode !== newMode) {
      const message = newMode === 'manual' 
        ? 'Switch to manual pricing? Your room data will be saved.'
        : 'Return to automatic pricing? Manual form will be cleared.';
      
      if (window.confirm(message)) {
        onModeChange(newMode);
      }
    } else {
      onModeChange(newMode);
    }
  };
  
  return (
    <div className="bg-gray-100 p-1 rounded-lg flex mb-8">
      <button
        onClick={() => handleModeChange('automatic')}
        className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
          mode === 'automatic'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <CalculatorIcon className="w-5 h-5 inline mr-2" />
        Automatic Pricing
      </button>
      <button
        onClick={() => handleModeChange('manual')}
        className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
          mode === 'manual'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <FileTextIcon className="w-5 h-5 inline mr-2" />
        Manual Pricing
      </button>
    </div>
  );
};

const ShapeSelector: React.FC<{
  selectedShape: string;
  onShapeChange: (shape: string) => void;
  dimensions: Record<string, number>;
  onDimensionsChange: (dimensions: Record<string, number>) => void;
}> = ({ selectedShape, onShapeChange, dimensions, onDimensionsChange }) => {
  const shapes = [
    { id: 'rectangle', name: 'Rectangle', fields: ['length', 'width', 'wallHeight'] },
    { id: 'square', name: 'Square', fields: ['side', 'wallHeight'] },
    { id: 'circle', name: 'Circle', fields: ['radius', 'wallHeight'] },
    { id: 'triangle', name: 'Triangle', fields: ['base', 'height', 'wallHeight'] },
    { id: 'custom', name: 'Custom', fields: ['area', 'roofArea'] }
  ];
  
  const selectedShapeData = shapes.find(s => s.id === selectedShape);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {shapes.map(shape => (
          <button
            key={shape.id}
            onClick={() => onShapeChange(shape.id)}
            className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
              selectedShape === shape.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            {shape.name}
          </button>
        ))}
      </div>
      
      {selectedShapeData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {selectedShapeData.fields.map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)} (m)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={dimensions[field] || ''}
                onChange={(e) => onDimensionsChange({
                  ...dimensions,
                  [field]: parseFloat(e.target.value) || 0
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={field === 'wallHeight' ? '2.8' : '0.00'}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RoomCard: React.FC<{
  room: Room;
  onRoomChange: (room: Room) => void;
  onRemove: () => void;
  rates: Rates;
}> = ({ room, onRoomChange, onRemove, rates }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const calculatedRoom = calculateRoom(room, rates);
  
  const updateRoom = (updates: Partial<Room>) => {
    onRoomChange({ ...room, ...updates });
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={room.name}
            onChange={(e) => updateRoom({ name: e.target.value })}
            className="font-semibold text-lg bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            placeholder="Room name"
          />
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600"
          >
            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
        <div className="flex items-center space-x-3">
          {calculatedRoom.calculations && (
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {calculatedRoom.calculations.subtotal.toFixed(2)} {rates.currency}
              </div>
              <div className="text-sm text-gray-500">
                {calculatedRoom.calculations.wallAreaAfter.toFixed(1)}m² walls + {calculatedRoom.calculations.roofArea.toFixed(1)}m² roof
              </div>
            </div>
          )}
          <button
            onClick={onRemove}
            className="text-red-400 hover:text-red-600"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div className="space-y-6">
          <ShapeSelector
            selectedShape={room.shape}
            onShapeChange={(shape) => updateRoom({ shape: shape as Room['shape'], dimensions: {} })}
            dimensions={room.dimensions}
            onDimensionsChange={(dimensions) => updateRoom({ dimensions })}
          />
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Openings (doors & windows)</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doors area (m²)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={room.openings.doors || ''}
                  onChange={(e) => updateRoom({
                    openings: { ...room.openings, doors: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Windows area (m²)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={room.openings.windows || ''}
                  onChange={(e) => updateRoom({
                    openings: { ...room.openings, windows: parseFloat(e.target.value) || 0 }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LiveSummary: React.FC<{
  rooms: Room[];
  rates: Rates;
}> = ({ rooms, rates }) => {
  const calculatedRooms = rooms.map(room => calculateRoom(room, rates));
  
  const totals = calculatedRooms.reduce((acc, room) => {
    if (room.calculations) {
      acc.totalWallArea += room.calculations.wallAreaAfter;
      acc.totalRoofArea += room.calculations.roofArea;
      acc.totalWallsPrice += room.calculations.wallsPrice;
      acc.totalRoofPrice += room.calculations.roofPrice;
      acc.grandTotal += room.calculations.subtotal;
    }
    return acc;
  }, {
    totalWallArea: 0,
    totalRoofArea: 0,
    totalWallsPrice: 0,
    totalRoofPrice: 0,
    grandTotal: 0
  });
  
  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-4">Quote Summary</h3>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span>Wall area ({totals.totalWallArea.toFixed(1)}m² × {rates.wallRate} {rates.currency})</span>
          <span>{totals.totalWallsPrice.toFixed(2)} {rates.currency}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Roof area ({totals.totalRoofArea.toFixed(1)}m² × {rates.roofRate} {rates.currency})</span>
          <span>{totals.totalRoofPrice.toFixed(2)} {rates.currency}</span>
        </div>
        <hr />
        <div className="flex justify-between text-xl font-bold text-green-600">
          <span>Total</span>
          <span>{totals.grandTotal.toFixed(2)} {rates.currency}</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-4">
        Rates: Walls {rates.wallRate} {rates.currency}/m², Roof {rates.roofRate} {rates.currency}/m²
      </div>
    </div>
  );
};

const ManualForm: React.FC<{
  onSubmit: (data: any) => void;
  onCancel: () => void;
}> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    projectType: 'animated_decor',
    description: '',
    roomCount: '',
    estimatedArea: '',
    timeline: 'flexible',
    budget: ''
  });
  
  const [files, setFiles] = useState<File[]>([]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, files });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Custom Animated Decor Request</h3>
        <p className="text-blue-700 text-sm">
          Our team will review your requirements and provide a personalized quote within 24-48 hours.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project Type
          </label>
          <select
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="animated_decor">Animated Decor</option>
            <option value="custom_wallpaper">Custom Wallpaper</option>
            <option value="interactive_wall">Interactive Wall</option>
            <option value="themed_room">Themed Room Design</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Rooms
          </label>
          <input
            type="number"
            min="1"
            value={formData.roomCount}
            onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 2"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe your vision, style preferences, and any specific requirements..."
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Estimated Area
          </label>
          <input
            type="text"
            value={formData.estimatedArea}
            onChange={(e) => setFormData({ ...formData, estimatedArea: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 25-30 sqm"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timeline
          </label>
          <select
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="asap">ASAP</option>
            <option value="1-2_weeks">1-2 weeks</option>
            <option value="1_month">Within 1 month</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget Range ({DEFAULT_RATES.currency})
          </label>
          <input
            type="text"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g. 2000-3000"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reference Files
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 mb-2">Drop files here or click to upload</p>
          <p className="text-xs text-gray-500">Photos, videos, inspiration materials (max 50MB each)</p>
          <input
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Choose Files
          </label>
        </div>
        {files.length > 0 && (
          <div className="mt-2 space-y-1">
            {files.map((file, idx) => (
              <div key={idx} className="text-sm text-gray-600 flex justify-between">
                <span>{file.name}</span>
                <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
};

// Main Component
const BookAppointment: React.FC = () => {
  const [mode, setMode] = useState<'automatic' | 'manual'>('automatic');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [rates] = useState<Rates>(DEFAULT_RATES);
  const [savedAutoData, setSavedAutoData] = useState<Room[]>([]);
  
  const hasUnsavedData = rooms.length > 0 || savedAutoData.length > 0;
  
  const addRoom = () => {
    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: `Room ${rooms.length + 1}`,
      shape: 'rectangle',
      dimensions: { length: 0, width: 0, wallHeight: DEFAULT_WALL_HEIGHT },
      openings: { doors: 0, windows: 0 }
    };
    setRooms([...rooms, newRoom]);
  };
  
  const updateRoom = (roomId: string, updatedRoom: Room) => {
    setRooms(rooms.map(room => room.id === roomId ? updatedRoom : room));
  };
  
  const removeRoom = (roomId: string) => {
    setRooms(rooms.filter(room => room.id !== roomId));
  };
  
  const handleModeChange = (newMode: 'automatic' | 'manual') => {
    if (newMode === 'manual' && rooms.length > 0) {
      setSavedAutoData(rooms);
    } else if (newMode === 'automatic' && savedAutoData.length > 0) {
      setRooms(savedAutoData);
    }
    setMode(newMode);
  };
  
  const handleSaveQuote = async () => {
    const quote = {
      quoteId: `Q-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      timestamp: new Date().toISOString(),
      mode: 'automatic',
      rateVersion: 'v2025.1',
      rates,
      rooms: rooms.map(room => calculateRoom(room, rates)),
      customerInfo
    };
    
    console.log('Saving quote:', quote);
    // API call: await fetch('/api/quotes/save', { method: 'POST', body: JSON.stringify(quote) })
    alert(`Quote saved! ID: ${quote.quoteId}`);
  };
  
  const handleManualSubmit = async (formData: any) => {
    const ticket = {
      ticketId: `T-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
      timestamp: new Date().toISOString(),
      mode: 'manual',
      status: 'pending',
      customerInfo,
      projectDetails: formData
    };
    
    console.log('Submitting manual request:', ticket);
    // API call: await fetch('/api/tickets/submit', { method: 'POST', body: JSON.stringify(ticket) })
    alert(`Request submitted! Ticket ID: ${ticket.ticketId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Appointment</h1>
          <p className="text-lg text-gray-600">Get instant pricing or request a custom quote</p>
        </div>
        
        <ModeToggle
          mode={mode}
          onModeChange={handleModeChange}
          hasUnsavedData={hasUnsavedData}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {mode === 'automatic' ? (
              <>
                <div className="space-y-6">
                  {rooms.map(room => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onRoomChange={(updatedRoom) => updateRoom(room.id, updatedRoom)}
                      onRemove={() => removeRoom(room.id)}
                      rates={rates}
                    />
                  ))}
                  
                  <button
                    onClick={addRoom}
                    className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
                  >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add {rooms.length === 0 ? 'First' : 'Another'} Room</span>
                  </button>
                </div>
                
                {rooms.length > 0 && (
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Address"
                        value={customerInfo.address}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex space-x-4 mt-6">
                      <button
                        onClick={handleSaveQuote}
                        className="flex-1 py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 font-medium"
                        disabled={!customerInfo.name || !customerInfo.email}
                      >
                        Save Quote
                      </button>
                      <button
                        className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                        disabled={!customerInfo.name || !customerInfo.email}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <ManualForm
                  onSubmit={handleManualSubmit}
                  onCancel={() => setMode('automatic')}
                />
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            {mode === 'automatic' && rooms.length > 0 && (
              <LiveSummary rooms={rooms} rates={rates} />
            )}
            
            {mode === 'manual' && (
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">What to Expect</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <p>Submit your request with project details and reference files</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <p>Our design team reviews your requirements (24-48 hours)</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <p>Receive personalized quote with design concepts</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <p>Schedule consultation to finalize details</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
