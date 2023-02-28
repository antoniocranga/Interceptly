import { useSubscription } from 'react-stomp-hooks';

export default function SubscribingComponent({ children }) {
    useSubscription('/user/specific', (message) => console.log(message));

    return <>{children}</>;
}
