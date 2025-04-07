import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Alert
} from '@mui/material';

interface Registro {
  matricula: string;
  semestre: string;
  curso: string;
  disciplina: string;
}

const RegistrosTable = () => {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await fetch('https://cadastro-disciplina-api-production.up.railway.app:3000/registros');
        if (!response.ok) {
          throw new Error('Erro ao carregar registros');
        }
        const data = await response.json();
        setRegistros(data);
      } catch (err) {
        setError('Erro ao carregar registros. Por favor, tente novamente.');
        console.error('Erro:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistros();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      p: 2,
      gap: 3
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Registros de Disciplinas Optativas
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: '100%', maxWidth: 800 }}>
          {error}
        </Alert>
      )}

      <TableContainer 
        component={Paper} 
        sx={{ 
          width: '100%', 
          maxWidth: 800,
          border: '2px solid #1976d2',
          borderRadius: 2
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                fontSize: '1.1rem',
                borderBottom: '2px solid #1976d2'
              }}>Matrícula</TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                fontSize: '1.1rem',
                borderBottom: '2px solid #1976d2'
              }}>Semestre</TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                fontSize: '1.1rem',
                borderBottom: '2px solid #1976d2'
              }}>Curso</TableCell>
              <TableCell sx={{ 
                fontWeight: 'bold', 
                textTransform: 'uppercase',
                fontSize: '1.1rem',
                borderBottom: '2px solid #1976d2'
              }}>Disciplina</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registros.map((registro, index) => (
              <TableRow key={index}>
                <TableCell sx={{ 
                  fontFamily: 'monospace',
                  fontSize: '1rem'
                }}>{registro.matricula}</TableCell>
                <TableCell sx={{ 
                  fontFamily: 'monospace',
                  fontSize: '1rem'
                }}>{registro.semestre}</TableCell>
                <TableCell sx={{ 
                  fontFamily: 'monospace',
                  fontSize: '1rem'
                }}>{registro.curso}</TableCell>
                <TableCell sx={{ 
                  fontFamily: 'monospace',
                  fontSize: '1rem'
                }}>{registro.disciplina}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
        sx={{ mt: 2 }}
      >
        Voltar para o Scanner
      </Button>
    </Box>
  );
};

export default RegistrosTable; 
