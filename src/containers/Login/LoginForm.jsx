import { Button, Stack, TextField, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useAuthContext } from '../../contexts/AuthContext'
import { useLogin } from '../actions'

const LoginForm = () => {
  const theme = useTheme()

  const auth = useAuthContext()

  const { register, handleSubmit } = useForm()

  const { isValidating: loginValidate, login } = useLogin()

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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Typography variant="h4" fontWeight={500}>
        Inventory
      </Typography>
      <Stack
        gap={2}
        sx={{
          padding: '1.5rem',
          width: 300,
          borderRadius: '0.5rem',
          border: `1.5px solid ${theme.palette.info.main}`
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          label="Username"
          {...register('username')}
        />
        <TextField
          size="small"
          variant="outlined"
          label="Password"
          type="password"
          {...register('password')}
        />
        <Button
          variant="contained"
          disabled={loginValidate}
          onClick={handleSubmit(onSubmit)}
        >
          {loginValidate ? 'Logging in' : 'Log in'}
        </Button>
      </Stack>
    </Box>
  )
}

export default LoginForm
