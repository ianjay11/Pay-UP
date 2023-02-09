import React from 'react';
import Face6Icon from '@mui/icons-material/Face6';
import MoneyIcon from '@mui/icons-material/Money';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DashboardIcon from '@mui/icons-material/Dashboard';

export const SidebarData = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: 'dashboard/home',
  },

  {
    title: 'Profile',
    icon: <Face6Icon />,
    link: 'dashboard/profile',
  },

  {
    title: 'Deals',
    icon: <HandshakeIcon />,
    link: 'dashboard/deals',
  }
];
