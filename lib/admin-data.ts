import { 
  Users, 
  Calendar, 
  Wallet, 
  Compass,
} from "lucide-react";

export const eventsData = [
  {
    id: 1,
    title: "Sajek Valley Cloud Expedition",
    date: "April 15 - 18, 2026",
    location: "Rangamati",
    bookings: 16,
    capacity: 24,
    status: "Active",
    price: "8,500 ৳",
    image: "/images/destinations/sajek.jpg"
  },
  {
    id: 2,
    title: "Bandarban Peak Conquest",
    date: "May 02 - 05, 2026",
    location: "Bandarban",
    bookings: 15,
    capacity: 20,
    status: "Active",
    price: "9,200 ৳",
    image: "/images/destinations/bandarban.jpg"
  },
  {
    id: 3,
    title: "St. Martin Island Escape",
    date: "May 20 - 23, 2026",
    location: "Cox's Bazar",
    bookings: 18,
    capacity: 30,
    status: "Active",
    price: "10,500 ৳",
    image: "/images/destinations/stmarting.jpg"
  },
  {
    id: 4,
    title: "Alpine Lake Trek",
    date: "Feb 10 - 14, 2026",
    location: "Kashmir",
    bookings: 25,
    capacity: 25,
    status: "Complete",
    price: "45,000 ৳",
    image: "https://static2.tripoto.com/media/filter/tst/img/1034325/TripDocument/1623485916_dsc04994_pano_1.jpg"
  },
  {
    id: 5,
    title: "Monsoon in Sylhet",
    date: "June 05 - 08, 2026",
    location: "Sylhet",
    bookings: 10,
    capacity: 20,
    status: "Postponed",
    price: "7,500 ৳",
    image: "/images/destinations/mirinja.jpeg"
  },
  {
    id: 6,
    title: "Cox's Bazar Weekend",
    date: "Jan 20 - 22, 2026",
    location: "Cox's Bazar",
    bookings: 40,
    capacity: 40,
    status: "Complete",
    price: "5,500 ৳",
    image: "/images/destinations/coxs.jpg"
  }
];

export const dashboardData = {
  stats: [
    { title: "Total Travelers", value: "12,482", icon: Users, change: "+12.5%", isPositive: true, color: "indigo" },
    { title: "Upcoming Events", value: eventsData.length.toString(), icon: Calendar, change: "+3.2%", isPositive: true, color: "blue" },
    { title: "Revenue", value: "20,986,350 ৳", icon: Wallet, change: "+8.7%", isPositive: true, color: "emerald" },
    { title: "New Bookings", value: "312", icon: Compass, change: "-2.1%", isPositive: false, color: "rose" },
  ],
  monthlyTravelers: [
    { month: "Jan", count: 1200, revenue: 45000 },
    { month: "Feb", count: 1560, revenue: 52000 },
    { month: "Mar", count: 1890, revenue: 61000 },
    { month: "Apr", count: 2100, revenue: 68000 },
    { month: "May", count: 2450, revenue: 75000 },
    { month: "Jun", count: 3200, revenue: 92000 },
  ],
  revenueByRegion: [
    { name: "Europe", value: 45, color: "#6366f1" },
    { name: "Asia", value: 30, color: "#3b82f6" },
    { name: "Americas", value: 15, color: "#10b981" },
    { name: "Others", value: 10, color: "#f43f5e" },
  ],
  recentTravelers: [
    { name: "John Doe", email: "john@example.com", region: "Europe", status: "Active", amount: "138,000 ৳" },
    { name: "Jane Smith", email: "jane@example.com", region: "Asia", status: "Active", amount: "396,750 ৳" },
    { name: "Michael Ross", email: "michael@example.com", region: "America", status: "Pending", amount: "102,350 ৳" },
    { name: "Sarah Connor", email: "sarah@example.com", region: "Europe", status: "Active", amount: "241,500 ৳" },
  ]
};
