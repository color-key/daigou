import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert,{AlertProps} from '@material-ui/lab/Alert';
import {Editor} from '@fay-react/material/richText';
import {postJson, getJson} from '@fay-react/lib/fetch';
import {getQueryString} from '@fay-react/lib/router';
import {BASE_URL} from '@/env';
import ImageUpload from './image-upload';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

export default () => {
  const classes = useStyles();
  const initBlogInfo = {title: '', keywords: '', description: '', thumbnail: '', content: null, createTime: ''};
  const [blogInfo, setBlogInfo] = React.useState(initBlogInfo);
  const [loading, setLoading] = React.useState(false);
  const [storageId, setStorageId] = React.useState<number>(0);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [findError, setFindError] = React.useState(false);

  const handleConfirm = () => {
    setLoading(true);
    const data: any = {
      title: blogInfo.title,
      keywords: blogInfo.keywords,
      description: blogInfo.description,
      thumbnail: blogInfo.thumbnail,
      content: blogInfo.content,
    }
    if(storageId){
      data.id = storageId;
      postJson({path: BASE_URL+'/blog/edit', data}).then((res: any) => {
        if(res.success){
          setSuccess(true);
        }else{
          setError(true);
        }
        setLoading(false);
      })
    }else{
      postJson({path: BASE_URL+'/blog/add', data}).then((res: any) => {
        if(res.success){
          setSuccess(true);
          setStorageId(res.result.insertId);
        }else{
          setError(true);
        }
        setLoading(false);
      })
    }
    
  };

  const handleClose = () => {
    success && setSuccess(false);
    error && setError(false);
    findError && setFindError(false);
  }

  React.useEffect(() => {
    const id = getQueryString('id');
    if(id){
      getJson({path: BASE_URL+'/blog/findById', data:{id}}).then((res: any) => {
        if(res.success && res.result[0]){
          setBlogInfo(res.result[0]);
          setStorageId(Number(id));
        }else{
          setFindError(true);
        }
      })
    }
  }, [])

  const handleCheck = () => {
    const {title, keywords, content=''} = blogInfo;
    return (
      title.length === 0 || keywords.length === 0
      || content===null || content.length === 0
    )
  }

  const handleChange = (key: string) => (e: any) => {
    if(key === 'content'||key==='thumbnail'){
      setBlogInfo({...blogInfo, [key]: e});
    }else{
      setBlogInfo({...blogInfo, [key]: e.target.value});
    }
  }
  console.log(blogInfo );
  // console.log(JSON.stringify(blogInfo.content) );

  return (
    <Box pt={4} pb={4}>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid container item xs={8} spacing={2}>
          <Grid container item xs={12} justify={"center"}>
            <div style={{textAlign: "center"}}>
              {blogInfo.thumbnail.length > 0 && <img src={blogInfo.thumbnail} style={{width: '200px', height: '200px'}}/>}
              <ImageUpload label={'上传缩略图'} onChange={handleChange('thumbnail')}/>
            </div>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={blogInfo.title}
              margin="dense"
              label="标题"
              type="email"
              fullWidth
              onChange={handleChange('title')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={blogInfo.keywords}
              margin="dense"
              label="关键词"
              type="email"
              fullWidth
              onChange={handleChange('keywords')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={blogInfo.description}
              margin="dense"
              label="摘要"
              type="email"
              fullWidth
              onChange={handleChange('description')}
            />
          </Grid>
          <Grid item xs={12}>
            <Editor
              key={storageId+'_'+blogInfo.createTime}
              defaultValue={blogInfo.content}
              onChange={handleChange('content')}
            />
          </Grid>
          <Grid item xs={12}>
            <div className={classes.wrapper}>
              <Button
                variant="contained"
                color="primary"
                disabled={handleCheck() || loading}
                onClick={handleConfirm}
                fullWidth
              >
                确认
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </Grid>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={success}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity="success" onClose={handleClose}>保存成功!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={error}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity="error" onClose={handleClose}>保存失败!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={findError}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity="error" onClose={handleClose}>数据获取失败!</Alert>
      </Snackbar>
    </Box>
  );
}
