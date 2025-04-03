        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            size="large"
            startIcon={<AutorenewIcon />}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)'
              },
              display: { xs: 'none', md: 'flex' }
            }}
            onClick={() => {
              const newRatings = {};
              Object.entries(CATEGORIES).forEach(([category, items]) => {
                items.forEach(item => {
                  const randomIndex = Math.floor(Math.random() * RATING_OPTIONS.length);
                  newRatings[`${category}-${item}`] = RATING_OPTIONS[randomIndex];
                });
              });
              setRatings(newRatings);
              setSnackbarMessage('已完成随机选择！');
              setSnackbarOpen(true);
            }}
          >
            随机选择
          </Button>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" startIcon={<HomeIcon />}>首页</Button>
            <Button color="inherit" startIcon={<InfoIcon />}>关于</Button>
            <Button color="inherit" startIcon={<HelpIcon />}>使用指南</Button>
          </Box>
        </Box>

        <IconButton
          color="inherit"
          sx={{ display: { xs: 'block', md: 'none' } }}
          onClick={() => setMobileMenuOpen(true)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </Container>
  </AppBar>

  <Drawer
    anchor="right"
    open={mobileMenuOpen}
    onClose={() => setMobileMenuOpen(false)}
  >
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        <ListItem button onClick={() => {
          const newRatings = {};
          Object.entries(CATEGORIES).forEach(([category, items]) => {
            items.forEach(item => {
              const randomIndex = Math.floor(Math.random() * RATING_OPTIONS.length);
              newRatings[`${category}-${item}`] = RATING_OPTIONS[randomIndex];
            });
          });
          setRatings(newRatings);
          setSnackbarMessage('已完成随机选择！');
          setSnackbarOpen(true);
          setMobileMenuOpen(false);
        }}>
          <ListItemIcon><AutorenewIcon /></ListItemIcon>
          <ListItemText primary="随机选择" />
        </ListItem>
        <ListItem button onClick={() => setMobileMenuOpen(false)}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="首页" />
        </ListItem>
        <ListItem button onClick={() => setMobileMenuOpen(false)}>
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText primary="关于" />
        </ListItem>
        <ListItem button onClick={() => setMobileMenuOpen(false)}>
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary="使用指南" />
        </ListItem>
      </List>
    </Box>
  </Drawer>

  <Container maxWidth="lg" sx={{
    py: 8,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    animation: 'fadeIn 0.6s ease-in-out',
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(20px)' },
      to: { opacity: 1, transform: 'translateY(0)' }
    }
  }}>
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        女M自评报告
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        SSS=非常喜欢，SS=喜欢，S=接受，Q=不喜欢但会做，N=拒绝，W=未知
      </Typography>
    </Box>
    
    {Object.entries(CATEGORIES).map(([category, items]) => (
      <Paper key={category} elevation={2} sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 3,
        backgroundColor: 'background.paper',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Typography variant="h5" sx={{ mb: 0 }}>
            {category}
          </Typography>
          <Select
            size="small"
            value={selectedBatchRating}
            onChange={(e) => {
              handleSetAllRating(category, e.target.value)
              setSelectedBatchRating('')
            }}
            displayEmpty
            placeholder="一键选择"
            renderValue={(value) => value || "一键选择"}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value=""><em>一键选择</em></MenuItem>
            {RATING_OPTIONS.map(rating => (
              <MenuItem key={rating} value={rating}>{rating}</MenuItem>
            ))}
          </Select>
        </Box>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          {items.map(item => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: { xs: 1.5, md: 2 },
                borderRadius: 2,
                height: '100%',
                backgroundColor: 'background.paper',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(98, 0, 234, 0.04)',
                  transform: 'translateX(4px)'
                },
              }}>
                <Typography sx={{ 
                  minWidth: { xs: 'auto', md: 120 }, 
                  mr: 1,
                  fontWeight: 500, 
                  color: 'text.primary',
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  flexShrink: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{item}</Typography>
                <Select
                  size="small"
                  value={getRating(category, item)}
                  onChange={(e) => handleRatingChange(category, item, e.target.value)}
                  sx={{ 
                    minWidth: { xs: 100, md: 120 },
                    '.MuiSelect-select': {
                      py: 1.5,
                      px: 2
                    }
                  }}
                >
                  <MenuItem value=""><em>请选择</em></MenuItem>
                  {RATING_OPTIONS.map(rating => (
                    <MenuItem key={rating} value={rating}>{rating}</MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    ))}

    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setOpenReport(true)}
        sx={{ minWidth: 200 }}
      >
        生成报告
      </Button>
    </Box>

    <Dialog
      open={openReport}
      onClose={() => setOpenReport(false)}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          minHeight: { xs: '95vh', md: 'auto' },
          maxHeight: { xs: '95vh', md: '90vh' },
          overflowY: 'auto',
          m: { xs: 1, sm: 2 }
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', pt: { xs: 2, md: 3 } }}>
        女M自评详细报告
      </DialogTitle>
      <DialogContent ref={reportRef} sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
        <Box sx={{ mb: 4, maxWidth: '100%', overflow: 'hidden' }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', textAlign: 'center' }}>
            总体评分分布
          </Typography>
          <Box sx={{
            width: '100%',
            height: { xs: 280, sm: 300, md: 300 },
            position: 'relative',
            mb: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <RadarChart
              width={window.innerWidth < 600 ? 280 : 500}
              height={window.innerWidth < 600 ? 260 : 300}
              data={getRadarData()}
              style={{ maxWidth: '100%' }}
            >
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fill: '#2c3e50',
                  fontSize: window.innerWidth < 600 ? 10 : 14
                }}
              />
              <PolarRadiusAxis angle={30} domain={[0, 6]} tick={{ fill: '#2c3e50' }} />
              <Radar name="评分" dataKey="value" stroke="#6200ea" fill="#6200ea" fillOpacity={0.6} animationDuration={500} />
              <Radar name="满分" dataKey="fullMark" stroke="#ddd" strokeDasharray="3 3" fill="none" />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: window.innerWidth < 600 ? 12 : 14 }} />
            </RadarChart>
          </Box>
        </Box>
        {Object.entries(CATEGORIES).map(([category, items]) => {
          const ratingGroups = RATING_OPTIONS.reduce((acc, rating) => {
            const itemsWithRating = items.filter(item => getRating(category, item) === rating)
            if (itemsWithRating.length > 0) {
              acc[rating] = itemsWithRating
            }
            return acc
          }, {})

          return (
            <Box key={category} sx={{ mb: 4, maxWidth: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', textAlign: 'center' }}>
                {category}
              </Typography>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', width: '100px' }}>评分</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>项目</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(ratingGroups).map(([rating, items]) => (
                      <TableRow key={rating}>
                        <TableCell sx={{ color: getRatingColor(rating), fontWeight: 'bold' }}>
                          {rating}
                        </TableCell>
                        <TableCell>
                          {items.join('、')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {items.map(item => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                    <Paper elevation={1} sx={{
                      p: 1.5,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 2,
                      '&:hover': {
                        backgroundColor: 'rgba(98, 0, 234, 0.04)'
                      }
                    }}>
                      <Typography sx={{ 
                        fontWeight: 500,
                        color: 'text.primary',
                        fontSize: '0.9rem'
                      }}>
                        {item}
                      </Typography>
                      <Box
                        sx={{
                          backgroundColor: getRatingColor(getRating(category, item)),
                          color: '#fff',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          display: 'inline-block',
                          fontWeight: 'bold',
                          minWidth: '60px',
                          textAlign: 'center'
                        }}
                      >
                        {getRating(category, item) || '未评分'}
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )
        })}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
        <Button
          onClick={handleExportImage}
          variant="contained"
          color="primary"
          disabled={snackbarOpen}
        >
           {snackbarOpen ? '生成中...' : '保存为图片'}
        </Button>
        <Button
    onClick={() => setOpenReport(false)}
    color="primary"
    variant="outlined"
    id="close-report-btn"
  >
    关闭
  </Button>
</DialogActions>
        <Button
          onClick={handleExportPDF}
          variant="contained"
          color="secondary"
        >
          保存为PDF
        </Button>
        <Button
          onClick={handleShareToWeChat}
          variant="contained"color="info"
        >
          分享到微信
        </Button>
      </DialogActions>
    </Dialog>

    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      message={snackbarMessage}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    />
  </Container>
</ThemeProvider>
