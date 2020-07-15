import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import FindInPageIcon from '@material-ui/icons/FindInPage';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {getJson, postJson} from '@fay-react/lib/fetch';
import {BASE_URL, PATH_PREFIX} from '@/env';
import {BlogType, SearchStateType} from './index';

const useRowStyles = makeStyles({
  root: {
    
  },
});

function Row(props: { row: BlogType, onRemove: any }) {
  const { row } = props;
  const classes = useRowStyles();
  const initOpenState = {desc: false};
  const [open, setOpen] = React.useState(initOpenState);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // const handleLook = React.useCallback((id: number) => {
  //   window.open(PATH_PREFIX+'/blog/'+id);
  // }, []);
  
  const handleEdit = React.useCallback((id: number) => {
    window.open(PATH_PREFIX+'/blog/edit?id='+id);
  }, []);

  const handleRemoveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemoveClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.keywords}</TableCell>
        <TableCell align="center">
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen({...initOpenState, desc: !open.desc})}>
            {open.desc ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>  
        </TableCell>
        <TableCell>
          {
            row.thumbnail.length > 0 &&
            <img src={row.thumbnail} style={{width: "50px", height: '50px'}}/>
          }
        </TableCell>
        <TableCell>{row.createTime}</TableCell>
        <TableCell>{row.updateTime}</TableCell>
        {/* <TableCell align="center">
          <IconButton size="small" onClick={() => handleLook(row.id)}>
            <FindInPageIcon />
          </IconButton>
        </TableCell> */}
        <TableCell align="center">
          <IconButton size="small" onClick={() => handleEdit(row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton size="small" onClick={handleRemoveClick}>
            <DeleteIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleRemoveClose}
          >
            <MenuItem onClick={() => props.onRemove(row.id)}>确定</MenuItem>
            <MenuItem onClick={handleRemoveClose}>取消</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open.desc} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {
                open.desc &&
                <div>
                  <Typography variant="body2" gutterBottom component="div">
                    {row.description}
                  </Typography>
                </div>
              }
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

interface Props{
  belongId?: string
  search: SearchStateType
}

export default ({search}: Props) => {

  const [state, setState] = React.useState({data: [], count: 0});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getData = () => {
    const data = {
      title: search.searchKeywords,
      keywords: search.searchKeywords,
      description: search.searchKeywords,
      content: search.searchKeywords,
      pageNum: page,
      pageSize: rowsPerPage
    }
    getJson({path: BASE_URL+'/blog/findByPage', data}).then(res => {
      console.log(res);
      if(res.success){
        setState({data: res.result, count: res.count})
      }
    })
  }

  const handleRemove = React.useCallback((id: number) => {
    postJson({path: BASE_URL + '/blog/removeById', data: {id}}).then(res => {
      if(res.success){
        getData();
      }else{
        alert('删除失败');
      }
    })
  }, []);

  React.useEffect(() => {
    getData();
  }, [JSON.stringify(search), page, rowsPerPage]);

  return (
    <Paper>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>编号</TableCell>
              <TableCell style={{width: '300px'}}>标题</TableCell>
              <TableCell style={{width: '200px'}}>关键词</TableCell>
              <TableCell align="center">摘要</TableCell>
              <TableCell>缩略图</TableCell>
              <TableCell>创建时间</TableCell>
              <TableCell>更新时间</TableCell>
              {/* <TableCell align="center">预览</TableCell> */}
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              state.data.map((row: BlogType) => (
                <Row key={row.id} row={row} onRemove={handleRemove}/>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={state.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
