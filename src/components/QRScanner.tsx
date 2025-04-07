import { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser';
import { Result } from '@zxing/library';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const QRScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const controlsRef = useRef<IScannerControls | null>(null);

  const stopScanner = () => {
    if (controlsRef.current) {
      controlsRef.current.stop();
      controlsRef.current = null;
    }
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };

  const startScanner = async () => {
    try {
      stopScanner();
      
      const codeReader = new BrowserQRCodeReader();
      const controls = await codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result, error) => {
          if (result) {
            handleScanSuccess(result);
          }
          if (error) {
            console.error(error);
          }
        }
      );
      controlsRef.current = controls;
    } catch (err) {
      setError('Erro ao acessar a câmera. Por favor, permita o acesso à câmera.');
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const handleScanSuccess = (result: Result) => {
    stopScanner();
    navigate('/form', { state: { matricula: result.getText() } });
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      gap: 2,
      p: 2
    }}>
      <Box
        component="img"
        src="/facisa.jpeg"
        alt="Logo Facisa"
        sx={{
          width: '200px',
          height: 'auto',
          mb: 2
        }}
      />

      <Typography variant="h4" component="h1" gutterBottom>
        Cadastro de Disciplina Optativa
      </Typography>

      <List sx={{ width: '100%', maxWidth: 500, mb: 3 }}>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Acesse o app Meu App Unifacisa" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Toque em Carteirinha digital" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CheckCircleOutlineIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Posicione o QR code no scanner abaixo" />
        </ListItem>
      </List>
      
      <Box sx={{ 
        width: '100%', 
        maxWidth: 500,
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <video
          ref={videoRef}
          style={{ width: '100%', height: 'auto' }}
          autoPlay
          playsInline
        />
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button 
          variant="contained" 
          onClick={() => {
            stopScanner();
            navigate('/form');
          }}
        >
          Pular leitura do QR Code
        </Button>

        <Button 
          variant="outlined" 
          onClick={() => {
            stopScanner();
            navigate('/registros');
          }}
        >
          Ver Registros
        </Button>
      </Box>
    </Box>
  );
};

export default QRScanner; 
