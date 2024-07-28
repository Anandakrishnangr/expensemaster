import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const Manage = () => {
    return (<>
        <Box sx={{ m: 1, border: "1px solid black" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", border: "1px solid black", padding: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <CallMadeIcon color='success' />
                    <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', fontWeight: "bold" }}>Income Categories</Typography>
                </Box>
                <Button variant='outlined'><AddIcon /> Create Category</Button>
            </Box>

            <Box >
                <Box sx={{ p: 2 }}>
                    <Grid container sx={{ m: 0, width: "100%" }}  >
                        {Array(6).fill('Category').map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{}}>
                                <Box sx={{ margin: '2px', border: '1px solid black' }}>
                                    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                                        <Button>
                                            <CreateIcon />
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                                        {category}
                                    </Box>
                                    <Typography>
                                        description
                                    </Typography>
                                    <Button fullWidth>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>


        </Box>

        <Box sx={{ m: 1, border: "1px solid black" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", border: "1px solid black", padding: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <CallReceivedIcon color='error' />
                <Typography sx={{ fontSize: '20px', fontFamily: 'cursive', fontWeight: "bold" }}>Expense Categories</Typography>
            </Box>
                <Button variant='outlined'><AddIcon /> Create Category</Button>
            </Box>

            <Box >
                <Box sx={{ p: 2 }}>
                    <Grid container sx={{ m: 0, width: "100%" }}  >
                        {Array(6).fill('Category').map((category, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{}}>
                                <Box sx={{ margin: '2px', border: '1px solid black' }}>
                                    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                                        <Button>
                                            <CreateIcon />
                                        </Button>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                                        {category}
                                    </Box>
                                    <Typography>
                                        description
                                    </Typography>
                                    <Button fullWidth>
                                        <DeleteIcon /> Delete
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>


        </Box>

       
    </>
    );
}

export default Manage;
