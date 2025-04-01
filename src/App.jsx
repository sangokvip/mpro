import React, { useState, useRef } from 'react'
import { Container, Typography, Paper, Grid, Box, Select, MenuItem, Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Snackbar, AppBar, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, createTheme, ThemeProvider } from '@mui/material'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
import ScienceIcon from '@mui/icons-material/Science'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import HelpIcon from '@mui/icons-material/Help'
import MenuIcon from '@mui/icons-material/Menu'

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
      main: '#6200ea',
      light: '#9d46ff',
      dark: '#0a00b6',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#546e7a',
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
      marginBottom: '2rem',
      letterSpacing: '-0.5px',
      color: '#1a237e',
    },
    subtitle1: {
      color: 'text.secondary',
      marginBottom: '2.5rem',
      fontSize: '1.1rem',
    },
    h5: {
      fontWeight: 600,
      marginBottom: '1.5rem',
      color: '#303f9f',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '12px',
          '&:hover': {
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#f5f5f5',
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
          padding: '8px 24px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
})

function App() {
  const [ratings, setRatings] = useState({})
  const [openReport, setOpenReport] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const reportRef = useRef(null)

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
      case 'SSS': return '#FF1493' // 深粉色
      case 'SS': return '#FF69B4' // 粉红色
      case 'S': return '#87CEEB' // 天蓝色
      case 'Q': return '#FFD700' // 金色
      case 'N': return '#FF4500' // 红橙色
      case 'W': return '#808080' // 灰色
      default: return '#CCCCCC' // 浅灰色
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
          scrollY: -window.scrollY,
          windowWidth: reportRef.current.scrollWidth,
          windowHeight: reportRef.current.scrollHeight,
          scale: 2
        })
        const image = canvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = image
        link.download = '女M自评报告.png'
        link.click()
        setSnackbarMessage('报告已成功保存为图片！')
        setSnackbarOpen(true)
      } catch (error) {
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
          filename: '女M自评报告.pdf',
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

  const handleSetAllSSS = (category) => {
    const items = CATEGORIES[category]
    const newRatings = { ...ratings }
    items.forEach(item => {
      newRatings[`${category}-${item}`] = 'SSS'
    })
    setRatings(newRatings)
    setSnackbarMessage(`已将${category}类别下所有选项设置为SSS`)
    setSnackbarOpen(true)
  }

  const [selectedBatchRating, setSelectedBatchRating] = useState('')

  const handleSetAllRating = (category, rating) => {
    const items = CATEGORIES[category]
    const newRatings = { ...ratings }
    items.forEach(item => {
      newRatings[`${category}-${item}`] = rating
    })
    setRatings(newRatings)
    setSnackbarMessage(`已将${category}类别下所有选项设置为${rating}`)
    setSnackbarOpen(true)
  }

  const handleShareToWeChat = () => {
    if (navigator.share) {
      navigator.share({
        title: '女M自评报告',
        text: '查看我的女M自评报告',
      }).then(() => {
        setSnackbarMessage('分享成功！')
        setSnackbarOpen(true)
      }).catch(() => {
        setSnackbarMessage('分享失败，请重试')
        setSnackbarOpen(true)
      })
    } else {
      setSnackbarMessage('您的浏览器不支持分享功能')
      setSnackbarOpen(true)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky" sx={{
        background: 'linear-gradient(135deg, #6200ea 0%, #9d46ff 100%)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography variant="h5" sx={{
              fontWeight: 'bold',
              color: 'white',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <ScienceIcon /> M-Profile Lab
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button color="inherit" startIcon={<HomeIcon />}>首页</Button>
              <Button color="inherit" startIcon={<InfoIcon />}>关于</Button>
              <Button color="inherit" startIcon={<HelpIcon />}>使用指南</Button>
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
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(98, 0, 234, 0.04)',
                  transform: 'translateX(4px)'
                },
              }}>
                <Typography sx={{ 
                  minWidth: { xs: 100, md: 120 }, 
                  fontWeight: 500, 
                  color: 'text.primary',
                  fontSize: { xs: '0.9rem', md: '1rem' }
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
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        女M自评详细报告
      </DialogTitle>
      <DialogContent ref={reportRef}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
            总体评分分布
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <RadarChart width={500} height={300} data={getRadarData()} style={{ margin: 'auto' }}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#2c3e50', fontSize: 14 }} />
              <PolarRadiusAxis angle={30} domain={[0, 6]} tick={{ fill: '#2c3e50' }} />
              <Radar name="评分" dataKey="value" stroke="#6200ea" fill="#6200ea" fillOpacity={0.6} animationDuration={500} />
              <Radar name="满分" dataKey="fullMark" stroke="#ddd" strokeDasharray="3 3" fill="none" />
              <Tooltip />
              <Legend />
            </RadarChart>
          </Box>
        </Box>
        {Object.entries(CATEGORIES).map(([category, items]) => (
          <Box key={category} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
              {category}
            </Typography>
            <Box sx={{ mb: 3 }}>
              <BarChart 
                width={800} 
                height={300} 
                data={getBarData(category)} 
                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                <XAxis 
                  dataKey="name" 
                  interval={0} 
                  angle={-45} 
                  textAnchor="end"
                  height={60} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  domain={[0, 6]} 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const ratings = ['', 'W', 'N', 'Q', 'S', 'SS', 'SSS']
                    return ratings[value] || value
                  }}
                />
                <Tooltip 
                  formatter={(value) => {
                    const ratings = ['未评分', 'W', 'N', 'Q', 'S', 'SS', 'SSS']
                    return ratings[value]
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="value" 
                  fill="#6200ea"
                  animationDuration={500}
                  label={{
                    position: 'top',
                    formatter: (value) => {
                      const ratings = ['未评分', 'W', 'N', 'Q', 'S', 'SS', 'SSS']
                      return ratings[value]
                    },
                    fontSize: 12
                  }}
                />
              </BarChart>
            </Box>
            <Grid container spacing={2}>
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
        ))}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3, gap: 2 }}>
        <Button
          onClick={handleExportImage}
          variant="contained"
          color="primary"
        >
          保存为图片
        </Button>
        <Button
          onClick={handleExportPDF}
          variant="contained"
          color="secondary"
        >
          保存为PDF
        </Button>
        <Button
          onClick={handleShareToWeChat}
          variant="contained"
          color="info"
        >
          分享到微信
        </Button>
        <Button
          onClick={() => setOpenReport(false)}
          variant="outlined"
          color="primary"
        >
          关闭
        </Button>
      </DialogActions>
    </Dialog>
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={() => setSnackbarOpen(false)}
      message={snackbarMessage}
    />
    </Container>
    <Box sx={{
      bgcolor: '#1a237e',
      color: 'white',
      py: 4,
      mt: 'auto'
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              关于本系统
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              本系统旨在帮助用户了解自己的倾向和兴趣。所有数据仅供参考，请理性对待评估结果。
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              使用说明
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              选择每个选项的评分，系统会自动生成分析报告。您可以随时修改评分，也可以导出报告进行保存。
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ textAlign: 'center', mt: 4, opacity: 0.6 }}>
          © 2025 M-Profile Lab Copyright
        </Typography>
      </Container>
    </Box>
  </ThemeProvider>
)
}

export default App