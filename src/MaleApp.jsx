import React, { useState, useRef } from 'react'
import { Container, Typography, Paper, Grid, Box, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, createTheme, ThemeProvider } from '@mui/material'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import AssessmentIcon from '@mui/icons-material/Assessment'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import HelpIcon from '@mui/icons-material/Help'
import MenuIcon from '@mui/icons-material/Menu'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CloseIcon from '@mui/icons-material/Close'

const RATING_OPTIONS = ['SSS', 'SS', 'S', 'Q', 'N', 'W']
const CATEGORIES = {
  '👑 性奴': ['🔞 强奸', '👥 轮奸', '💋 口爆', '💦 颜射', '💉 内射', '🍑 肛交', '🔧 器具折磨', '⚡️ 强制高潮', '💧 潮吹失禁', '🎭 自慰展示', '🚫 禁止高潮', '🔄 扩张阴道', '⭕️ 扩张肛门', '🔄 双阳具插入', '➕ 多阳具插入', '✌️ 双插'],
  '🐕 犬奴': ['🔒 囚笼关押', '⛓️ 项圈镣铐', '🍽️ 喂食', '🐾 爬行', '👣 舔足', '👠 踩踏', '🎠 骑乘'],
  '🎎 玩偶奴': ['🎭 角色扮演', '👔 制服诱惑', '🎭 人偶装扮', '💍 乳环', '💎 阴环', '💫 脐环', '✂️ 剃毛', '🔍 内窥镜研究', '🔧 性工具研究', '🎨 作为艺术品', '🪑 作为家具', '🚬 作为烟灰缸', '👗 作为女仆', '🤐 限制说话内容'],
  '🌲 野奴': ['🌳 野外暴露', '⛓️ 野外奴役', '🏃‍♀️ 野外流放', '🌿 野外玩弄', '🏢 公共场合暴露', '🏛️ 公共场合玩弄', '🎗️ 公开场合捆绑（衣服内）', '📱 公开场合器具（衣服内）', '👀 露阴（像朋友）', '👥 露阴（向生人）', '🔐 贞操带', '📿 公开场合项圈'],
  '🐾 兽奴': ['🐕 兽交', '🐺 群兽轮交', '🐎 人兽同交', '🦁 兽虐', '🐜 昆虫爬身'],
  '⚔️ 刑奴': ['👋 耳光', '🤐 口塞', '💇‍♀️ 扯头发', '👢 皮带', '🎯 鞭子', '🎋 藤条', '🪵 木板', '🏏 棍棒', '🖌️ 毛刷', '⚡️ 虐阴', '🔗 紧缚', '⛓️ 吊缚', '🔒 拘束', '📎 乳夹', '⚡️ 电击', '🕯️ 滴蜡', '📍 针刺', '💉 穿孔', '🔥 烙印', '🎨 刺青', '✂️ 切割', '🔥 火刑', '💧 水刑', '😮‍💨 窒息', '👊 体罚', '🧊 冰块'],
  '🚽 厕奴': ['👅 舔精', '🥛 吞精', '💧 唾液', '💦 喝尿', '🚿 尿浴', '👄 舔阴', '💦 放尿', '🚰 灌肠', '👅 舔肛', '💩 排便', '🛁 粪浴', '🍽️ 吃粪', '🤧 吃痰', '🩸 吃经血'],
  '💭 心奴': ['🗣️ 言语侮辱', '😈 人格侮辱', '🧠 思维控制', '🌐 网络控制', '📢 语言管教'],
  '✨ 其他': ['👥 多奴调教', '👑 多主调教', '🌐 网络公调', '🪶 瘙痒', '📅 长期圈养', '⏱️ 短期圈养', '😴 剥夺睡眠', '🌀 催眠', '👭 同性性爱']
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4081',
      light: '#FF80AB',
      dark: '#F50057',
    },
    secondary: {
      main: '#7C4DFF',
      light: '#B388FF',
      dark: '#651FFF',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: '#1565C0',
      marginBottom: '1.5rem',
    },
    subtitle1: {
      color: '#3F51B5',
      fontSize: '1.1rem',
      lineHeight: 1.8,
      marginBottom: '2rem',
    },
    h5: {
      fontWeight: 600,
      color: '#1976D2',
      marginBottom: '1rem',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(25, 118, 210, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(25, 118, 210, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(25, 118, 210, 0.2)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #1565C0 30%, #1976D2 90%)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#F5F5F5',
          },
        },
      },
    },
  },
})

function MaleApp() {
  const [ratings, setRatings] = useState({})
  const [openReport, setOpenReport] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedBatchRating, setSelectedBatchRating] = useState('')
  const [activeCategory, setActiveCategory] = useState(Object.keys(CATEGORIES)[0])
  const reportRef = useRef(null)

  const groupRatingsByLevel = (category) => {
    const items = CATEGORIES[category]
    const groups = {
      SSS: [], SS: [], S: [], Q: [], N: [], W: [], unrated: []
    }
    
    items.forEach(item => {
      const rating = getRating(category, item)
      if (rating) {
        groups[rating].push(item)
      } else {
        groups.unrated.push(item)
      }
    })
    
    return groups
  }

  const handleRatingChange = (category, item, value) => {
    setRatings(prev => ({
      ...prev,
      [`${category}-${item}`]: value
    }))
  }

  const getRating = (category, item) => {
    return ratings[`${category}-${item}`] || ''
  }

  const getRatingColor = (rating) => {
    switch(rating) {
      case 'SSS': return '#FF4081'
      case 'SS': return '#7C4DFF'
      case 'S': return '#448AFF'
      case 'Q': return '#00BCD4'
      case 'N': return '#4CAF50'
      case 'W': return '#FF9800'
      default: return '#F5F5F5'
    }
  }

  const getRadarData = () => {
    return Object.entries(CATEGORIES).map(([category]) => {
      const items = CATEGORIES[category]
      const categoryScores = items.map(item => {
        const rating = getRating(category, item)
        switch(rating) {
          case 'SSS': return 6
          case 'SS': return 5
          case 'S': return 4
          case 'Q': return 3
          case 'N': return 2
          case 'W': return 1
          default: return 0
        }
      })
      const avgScore = categoryScores.reduce((a, b) => a + b, 0) / items.length
      return {
        category,
        value: avgScore,
        fullMark: 6
      }
    })
  }

  const getBarData = (category) => {
    return CATEGORIES[category].map(item => ({
      name: item,
      value: (() => {
        const rating = getRating(category, item)
        switch(rating) {
          case 'SSS': return 6
          case 'SS': return 5
          case 'S': return 4
          case 'Q': return 3
          case 'N': return 2
          case 'W': return 1
          default: return 0
        }
      })()
    }))
  }

  const handleExportImage = async () => {
    if (reportRef.current) {
      try {
        const canvas = await html2canvas(reportRef.current, {
          scale: 2, // 提高图片质量
          useCORS: true, // 允许跨域图片
          allowTaint: true,
          backgroundColor: '#FFFFFF',
          windowWidth: reportRef.current.scrollWidth,
          windowHeight: reportRef.current.scrollHeight,
          logging: false,
          onclone: (clonedDoc) => {
            const element = clonedDoc.querySelector('[role="dialog"]');
            if (element) {
              element.style.transform = 'none';
              element.style.maxHeight = 'none';
            }
          }
        })
        const url = canvas.toDataURL('image/png', 1.0)
        const link = document.createElement('a')
        link.download = '男M自评报告.png'
        link.href = url
        link.click()
        setSnackbarMessage('报告已保存为图片！')
        setSnackbarOpen(true)
      } catch (error) {
        console.error('导出图片错误:', error)
        setSnackbarMessage('导出图片失败，请重试')
        setSnackbarOpen(true)
      }
    }
  }

  const handleExportPDF = async () => {
    if (reportRef.current) {
      try {
        const element = reportRef.current
        const opt = {
          margin: 1,
          filename: '男M自评报告.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }
        await html2pdf().set(opt).from(element).save()
        setSnackbarMessage('报告已成功保存为PDF！')
        setSnackbarOpen(true)
      } catch (error) {
        setSnackbarMessage('导出PDF失败，请重试')
        setSnackbarOpen(true)
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #FFF8E1 0%, #FFECB3 100%)',
      }}>
        <AppBar position="sticky" color="transparent" elevation={0} sx={{
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}>
          <Container maxWidth="lg">
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AssessmentIcon sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  男M评测系统
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                <Button color="primary" startIcon={<HomeIcon />}>首页</Button>
                <Button color="primary" startIcon={<InfoIcon />}>关于</Button>
                <Button color="primary" startIcon={<HelpIcon />}>帮助</Button>
              </Box>
              <IconButton
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
          <Box sx={{ width: 250, p: 2 }}>
            <List>
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="首页" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary="关于" />
              </ListItem>
              <ListItem button>
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary="帮助" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Container maxWidth="xl" sx={{ py: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Paper sx={{ p: 2, height: '100%', position: 'sticky', top: '80px' }}>
                <Typography variant="h6" gutterBottom>类别选择</Typography>
                <List>
                  {Object.keys(CATEGORIES).map((category) => (
                    <ListItem 
                      button 
                      key={category}
                      selected={category === activeCategory}
                      onClick={() => setActiveCategory(category)}
                      sx={{
                        borderRadius: 1,
                        mb: 1,
                        '&.Mui-selected': {
                          backgroundColor: theme.palette.primary.light,
                          color: 'white',
                        }
                      }}
                    >
                      <ListItemText primary={category} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={9}>
              <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom sx={{
              background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>
              男M自评报告
            </Typography>
            <Typography variant="subtitle1" sx={{
              maxWidth: 600,
              mx: 'auto',
              color: '#3F51B5',
              fontSize: '1.1rem',
              lineHeight: 1.8,
              fontWeight: 500
            }}>
              这是一个专业的男性M倾向评估工具，请根据您的真实想法进行选择。
            </Typography>
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<AutorenewIcon />}
                sx={{
                  background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
                  color: 'white',
                  padding: '14px 36px',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2196F3 30%, #1976D2 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)'
                  }
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
            </Box>
          </Box>

          <Grid container spacing={4}>
            {Object.entries(CATEGORIES).map(([category, items]) => (
              <Grid item xs={12} md={6} key={category}>
                <Paper sx={{
                  p: 4,
                  background: 'linear-gradient(to bottom right, #FFFFFF 0%, #F8F9FA 100%)',
                  border: '1px solid rgba(25, 118, 210, 0.1)',
                  boxShadow: '0 8px 16px rgba(25, 118, 210, 0.1)',
                  '&:hover': {
                    boxShadow: '0 12px 24px rgba(25, 118, 210, 0.15)'
                  }
                }}>
                  <Typography variant="h5" gutterBottom sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: '#1976D2',
                    fontWeight: 600,
                    letterSpacing: '0.5px'
                  }}>
                    {category}
                    <Select
                      size="small"
                      value={selectedBatchRating}
                      onChange={(e) => {
                        const items = CATEGORIES[category];
                        const newRatings = { ...ratings };
                        items.forEach(item => {
                          newRatings[`${category}-${item}`] = e.target.value;
                        });
                        setRatings(newRatings);
                        setSnackbarMessage(`已将${category}类别下所有选项设置为${e.target.value}`);
                        setSnackbarOpen(true);
                        setSelectedBatchRating('');
                      }}
                      displayEmpty
                      placeholder="一键选择"
                      renderValue={(value) => value || "一键选择"}
                      sx={{ ml: 2, minWidth: 100 }}
                    >
                      <MenuItem value="">-</MenuItem>
                      {RATING_OPTIONS.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </Typography>
                  <Grid container spacing={2}>
                    {items.map((item) => (
                      <Grid item xs={12} sm={6} key={item}>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}>
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {item}
                          </Typography>
                          <Select
                            value={getRating(category, item)}
                            onChange={(e) => handleRatingChange(category, item, e.target.value)}
                            size="small"
                            sx={{
                              minWidth: 120,
                              backgroundColor: getRatingColor(getRating(category, item)),
                              borderRadius: '8px',
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(25, 118, 210, 0.2)'
                              },
                              '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(25, 118, 210, 0.4)'
                              },
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#1976D2'
                              },
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 8px rgba(25, 118, 210, 0.15)'
                              }
                            }}
                          >
                            <MenuItem value="">-</MenuItem>
                            {RATING_OPTIONS.map((option) => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => setOpenReport(true)}
              startIcon={<AssessmentIcon />}
            >
              生成报告
            </Button>
          </Box>
        </Container>

        <Dialog
          open={openReport}
          onClose={() => setOpenReport(false)}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              maxHeight: '90vh',
              overflowY: 'auto',
              margin: '16px',
              borderRadius: '12px',
              '@media print': {
                maxHeight: 'none',
                overflow: 'visible'
              },
              '@media (max-width: 600px)': {
                margin: '8px',
                maxHeight: '95vh'
              }
            }
          }}
        >
          <DialogTitle sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>男M自评报告</Typography>
              <IconButton onClick={() => setOpenReport(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers ref={reportRef}>
            <Box sx={{ p: 4, backgroundColor: '#FFFFFF' }}>
              <Typography variant="h4" gutterBottom align="center" sx={{
                background: 'linear-gradient(45deg, #FF4081 30%, #F50057 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                letterSpacing: '1px',
                marginBottom: '2.5rem',
                fontSize: '2.5rem'
              }}>
                男M倾向分析报告
              </Typography>
              <Box sx={{ mb: 6 }}>
                <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                  总体评分分布
                </Typography>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                      <Typography variant="h6" gutterBottom>雷达图分析</Typography>
                      <ResponsiveContainer width="100%" height={400}>
                        <RadarChart data={getRadarData()}>
                          <PolarGrid stroke="rgba(25, 118, 210, 0.2)" />
                          <PolarAngleAxis 
                            dataKey="category" 
                            tick={{ 
                              fill: theme.palette.primary.main, 
                              fontSize: 14,
                              fontWeight: 500 
                            }} 
                          />
                          <PolarRadiusAxis 
                            angle={30} 
                            domain={[0, 6]} 
                            tick={{ 
                              fill: theme.palette.primary.main,
                              fontSize: 12 
                            }} 
                          />
                          <Radar 
                            name="评分" 
                            dataKey="value" 
                            stroke={theme.palette.primary.main} 
                            fill={theme.palette.primary.main} 
                            fillOpacity={0.4} 
                          />
                          <Tooltip />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                      <Typography variant="h6" gutterBottom>评分等级说明</Typography>
                      <TableContainer sx={{ flex: 1, overflowY: 'auto', maxHeight: { xs: '300px', md: 'none' }, mt: 2 }}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>等级</TableCell>
                              <TableCell>说明</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {RATING_OPTIONS.map((rating) => (
                              <TableRow key={rating}>
                                <TableCell>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box
                                      sx={{
                                        width: 16,
                                        height: 16,
                                        borderRadius: '50%',
                                        backgroundColor: getRatingColor(rating)
                                      }}
                                    />
                                    {rating}
                                  </Box>
                                </TableCell>
                                <TableCell>{{
                                  'SSS': '极度渴望，无法抗拒',
                                  'SS': '非常喜欢，主动追求',
                                  'S': '比较喜欢，愿意尝试',
                                  'Q': '稍有兴趣，可以接受',
                                  'N': '无感，但不反感',
                                  'W': '完全不能接受'
                                }[rating]}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, color: theme.palette.primary.main, fontWeight: 600 }}>
                  详细评分分析
                </Typography>
                {Object.entries(CATEGORIES).map(([category, items]) => {
                  const ratingGroups = groupRatingsByLevel(category);
                  return (
                    <Box key={category} sx={{ backgroundColor: '#F8F9FA', borderRadius: '16px', p: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{
                        color: theme.palette.primary.dark,
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        '&::before': {
                          content: '""',
                          width: '4px',
                          height: '24px',
                          backgroundColor: theme.palette.primary.main,
                          marginRight: '12px',
                          borderRadius: '2px'
                        }
                      }}>
                        {category}
                      </Typography>
                      {Object.entries(ratingGroups).map(([level, items]) => {
                        if (items.length === 0) return null;
                        return (
                          <Box key={level} sx={{ mt: 2 }}>
                            <Typography 
                              variant="subtitle1" 
                              sx={{ 
                                mb: 1,
                                color: level !== 'unrated' ? getRatingColor(level) : 'text.secondary',
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1
                              }}
                            >
                              {level === 'unrated' ? '未评分项目' : `${level} 级项目`}
                              <Box 
                                sx={{ 
                                  width: 8,
                                  height: 8,
                                  borderRadius: '50%',
                                  backgroundColor: level !== 'unrated' ? getRatingColor(level) : 'text.secondary'
                                }} 
                              />
                            </Typography>
                            <Grid container spacing={2}>
                              {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item}>
                                  <Paper
                                    elevation={1}
                                    sx={{
                                      p: 2,
                                      backgroundColor: level !== 'unrated' ? `${getRatingColor(level)}10` : 'background.paper',
                                      border: '1px solid',
                                      borderColor: level !== 'unrated' ? getRatingColor(level) : 'divider',
                                      borderRadius: '8px',
                                      transition: 'all 0.3s ease',
                                      '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: `0 4px 12px ${level !== 'unrated' ? getRatingColor(level) + '40' : 'rgba(0,0,0,0.1)'}`,
                                      }
                                    }}
                                  >
                                    <Typography variant="body2">{item}</Typography>
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </Box>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleExportImage} startIcon={<AssessmentIcon />}>
              保存为图片
            </Button>
            <Button onClick={handleExportPDF} startIcon={<AssessmentIcon />}>
              导出PDF
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
        />
      </Box>
    </ThemeProvider>
  )
}

export default MaleApp