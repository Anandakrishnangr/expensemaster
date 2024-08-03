import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const AboutUs: React.FC = () => {
  return (
    <Container component={Paper} sx={{ p: 4, mt: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" gutterBottom>
          About Us
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        Welcome to our Expense Tracking App! Our mission is to provide an easy-to-use platform for individuals and families to manage their finances effectively. Keeping track of your expenses and income is crucial to achieving financial stability and reaching your financial goals.
      </Typography>
      <Typography variant="body1" paragraph>
        Our app offers a comprehensive set of features designed to make financial tracking simple and efficient. Whether you're looking to monitor your daily spending, plan your monthly budget, or analyze your financial habits, our app has got you covered.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Our Aim
      </Typography>
      <Typography variant="body1" paragraph>
        Our primary aim is to empower users with the tools and knowledge needed to make informed financial decisions. We believe that by providing detailed insights into spending patterns and income sources, users can better understand their financial situation and make adjustments to improve their financial health.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Features
      </Typography>
      <Typography variant="body1" paragraph>
        - Track your daily, weekly, and monthly expenses and income.
        <br />
        - Categorize transactions for better organization and analysis.
        <br />
        - Set budget goals and monitor your progress.
        <br />
        - Generate detailed reports and visualizations to gain insights into your financial habits.
        <br />
        - Secure and user-friendly interface with data encryption.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Our Team
      </Typography>
      <Typography variant="body1" paragraph>
        We are a dedicated team of developers and financial enthusiasts committed to helping you take control of your finances. Our team continuously works on improving the app and adding new features based on user feedback and the latest financial trends.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions, feedback, or suggestions, please feel free to reach out to us. Your input is valuable in helping us enhance the app and provide you with the best experience possible.
        <br />
        <strong>Email:</strong> support@expensetracker.com
      </Typography>
    </Container>
  );
};

export default AboutUs;
