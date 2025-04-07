import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress
} from '@mui/material';

const cursos = [
  'Sistema de Informação',
  'Direito',
  'Engenharia Civil'
];

const disciplinas = [
  'Inteligência Artificial',
  'Desenvolvimento Mobile',
  'Segurança da Informação',
  'Cloud Computing',
  'Internet das Coisas'
];

const semestres = [
  'Primeiro Semestre',
  'Segundo Semestre',
  'Terceiro Semestre',
  'Quarto Semestre',
  'Quinto Semestre',
  'Sexto Semestre',
  'Sétimo Semestre',
  'Oitavo Semestre'
];

const DisciplineForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    matricula: location.state?.matricula || '',
    semestre: '',
    curso: '',
    disciplina: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.matricula) newErrors.matricula = 'Matrícula é obrigatória';
    if (!formData.semestre) newErrors.semestre = 'Semestre é obrigatório';
    if (!formData.curso) newErrors.curso = 'Curso é obrigatório';
    if (!formData.disciplina) newErrors.disciplina = 'Disciplina é obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:3000/registros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matricula: formData.matricula.trim(),
          semestre: formData.semestre,
          curso: formData.curso,
          disciplina: formData.disciplina
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados');
      }

      setShowSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (err) {
      setErrorMessage('Erro ao enviar dados. Por favor, tente novamente.');
      console.error('Erro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      p: 2,
      gap: 2
    }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Disciplina Optativa
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ width: '100%', maxWidth: 500 }}>
          {errorMessage}
        </Alert>
      )}

      {showSuccess && (
        <Alert severity="success" sx={{ width: '100%', maxWidth: 500 }}>
          Cadastro realizado com sucesso! Redirecionando...
        </Alert>
      )}

      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 2,
          width: '100%',
          maxWidth: 500
        }}
      >
        <TextField
          label="Matrícula"
          name="matricula"
          value={formData.matricula}
          onChange={handleChange}
          error={!!errors.matricula}
          helperText={errors.matricula}
          fullWidth
          disabled={!!location.state?.matricula}
        />

        <TextField
          select
          label="Semestre"
          name="semestre"
          value={formData.semestre}
          onChange={handleChange}
          error={!!errors.semestre}
          helperText={errors.semestre}
          fullWidth
        >
          {semestres.map((semestre) => (
            <MenuItem key={semestre} value={semestre}>
              {semestre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Curso"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          error={!!errors.curso}
          helperText={errors.curso}
          fullWidth
        >
          {cursos.map((curso) => (
            <MenuItem key={curso} value={curso}>
              {curso}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Disciplina"
          name="disciplina"
          value={formData.disciplina}
          onChange={handleChange}
          error={!!errors.disciplina}
          helperText={errors.disciplina}
          fullWidth
        >
          {disciplinas.map((disciplina) => (
            <MenuItem key={disciplina} value={disciplina}>
              {disciplina}
            </MenuItem>
          ))}
        </TextField>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button 
            variant="contained" 
            type="submit" 
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Enviar'}
          </Button>

          <Button 
            variant="outlined" 
            onClick={() => {
              window.location.href = '/';
            }}
            fullWidth
            disabled={isLoading}
          >
            Voltar para o Scanner
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DisciplineForm; 