import { Container, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'


const HelloPage = () => {
  const { username } = useParams();


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {`Hello, ${username}`}
      </Typography>
    </Container>
  )
}

export default HelloPage;