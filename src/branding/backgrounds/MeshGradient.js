import { minHeight } from '@mui/system';

export default function MeshGradient({ children }) {
    return (
        <div
            style={{
                minHeight: '100vh',
                backgroundColor: '#1fcae0',
                backgroundImage:
                    'radial-gradient(at 58% 96%, hsla(101, 94%, 65%, 1) 0, hsla(101, 94%, 65%, 0) 50%),radial-gradient(at 3% 15%, hsla(124, 92%, 63%, 1) 0, hsla(124, 92%, 63%, 0) 50%),radial-gradient(at 83% 21%, hsla(355, 91%, 67%, 1) 0, hsla(355, 91%, 67%, 0) 50%),radial-gradient(at 79% 47%, hsla(112, 91%, 62%, 1) 0, hsla(112, 91%, 62%, 0) 50%),radial-gradient(at 100% 58%, hsla(82, 87%, 54%, 1) 0, hsla(82, 87%, 54%, 0) 50%),radial-gradient(at 77% 33%, hsla(219, 92%, 67%, 1) 0, hsla(219, 92%, 67%, 0) 50%)'
            }}
        >
            <div
                style={{
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    minHeight: '100vh',
                    backdropFilter: 'blur(20px)'
                }}
            >
                {children}
            </div>
        </div>
    );
}
