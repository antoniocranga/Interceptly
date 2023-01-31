import { Container } from '@mui/material';
import StickyFooter from '../src/components/Footer';
import WebsiteNavBar from '../src/components/WebsiteNavBar';
import DashboardNavBar from '../src/components/DashboardNavBar';

export default function MainLayout({ children, type }) {
    return (
        <>
            {type == 'website' ? <WebsiteNavBar>{children}</WebsiteNavBar> : <DashboardNavBar>{children}</DashboardNavBar>}
        </>
    );
}
