import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import QRScanner from './components/QRScanner';
import DisciplineForm from './components/DisciplineForm';
import RegistrosTable from './components/RegistrosTable';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<QRScanner />} />
          <Route path="/form" element={<DisciplineForm />} />
          <Route path="/registros" element={<RegistrosTable />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
