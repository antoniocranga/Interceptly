import { Container } from "@mui/system";
import {useRouter} from 'next/router';
export default function Project(){
    const router = useRouter()
    const {projectId} = router.query
    return <Container>
        {projectId}
    </Container>
}


