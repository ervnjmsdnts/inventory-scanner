import { Key, Person } from '@mui/icons-material'
import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../contexts/AuthContext'
import { useLogin } from '../actions'
import { ReactComponent as LoginSVG } from '../../assets/login.svg'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const auth = useAuthContext()

  const { register, handleSubmit } = useForm()

  const { isValidating: loginValidate, login } = useLogin()

  const navigate = useNavigate()

  const onSubmit = useCallback(
    async data => {
      try {
        const { token } = await login({ ...data })

        localStorage.setItem('token', token)
        auth.login()

        toast.success('Welcome!')
      } catch (error) {
        toast.error(error.response.data.message)
      }
    },
    [login, auth]
  )

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        height: '100vh'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography fontWeight="bold" color="primary.main" variant="h4">
          Hi, Welcome Back!
        </Typography>
        <Stack
          gap={2}
          sx={{
            padding: '1.5rem',
            width: 500
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            label="Username"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              )
            }}
            {...register('username')}
          />
          <TextField
            size="small"
            variant="outlined"
            label="Password"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              )
            }}
            {...register('password')}
          />
          <Button
            variant="contained"
            disabled={loginValidate}
            onClick={handleSubmit(onSubmit)}
          >
            {loginValidate ? 'Logging in' : 'Log in'}
          </Button>
          <Button variant="contained" onClick={() => navigate('/scan')}>
            Scan
          </Button>
        </Stack>
        <Box sx={{ display: { xs: 'block', sm: 'none' }, textAlign: 'center' }}>
          <Typography color="gray">
            &copy; All Right Reserved Saranghaeyo Korean Store
          </Typography>
          <Typography color="gray">
            Developed & Maintaind by The Developers
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          background: 'linear-gradient(to bottom, #00A3F9, #6B0AC9)',
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '16px'
        }}
        height="100%"
      >
        <Typography
          color="white"
          variant="h4"
          fontWeight="bold"
          textAlign="center"
        >
          Welcome to Your Inventory and Point of Sale System
        </Typography>
        <LoginSVG
          style={{
            width: '500px'
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          px="64px"
        >
          <Typography color="lightGray">
            &copy; All Right Reserved Saranghaeyo Korean Store
          </Typography>
          <Typography color="lightGray">
            Developed & Maintaind by The Developers
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm
