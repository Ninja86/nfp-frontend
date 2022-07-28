import {useCallback, useEffect, useState} from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  Avatar,
  Box, Button,
  Card,
  CardContent,
  CardHeader, Chip,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {projectInfoApi} from '../../../__fake-api__/project-info-api';
import {DashboardLayout} from '../../../components/dashboard/dashboard-layout';
import {
  CompanyOverview
} from '../../../components/projects/projectInfo/company-overview';
import {useMounted} from '../../../hooks/use-mounted';
import {gtm} from '../../../lib/gtm';
import {styled, useTheme} from "@mui/material/styles";
import {grey, red} from '@mui/material/colors';
import dynamic from "next/dynamic";
import {CallMade, Share, Twitter, Reddit, GitHub, Telegram} from "@mui/icons-material";
import {faDiscord} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({logoImg, title, description, tags}) => {
  const theme = useTheme();
  return (
    <Grid container direction="row" spacing={theme.spacing(1)}>
      <Grid
        item
        container
        sm={2}
        md={2}
        direction={'column'}
        alignItems="center"
        justifyContent={"start"}
      >
        <Grid item sx={{backgroundColor:"transparent", marginTop: theme.spacing(1)}}>
          <Typography>
            <Avatar
              src={logoImg}
              sx={{
                background: 'transparent',
                width: 100,
                height: 100,
              }}
              variant="rounded"
            >
            </Avatar>
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={9} md={9} sx={{marginLeft:theme.spacing(2)}}>
        <Typography variant="h6" align={"left"}>
          {title}
        </Typography>
        <Typography
          sx={{ mt: 1 }}
          variant="body2"
        >
          {description}
        </Typography>
        <Stack direction={"row"} sx={{marginTop:theme.spacing(2)}} spacing={theme.spacing(1)}>
          {tags?.map((e, idx) => {
            return (<Chip
              key={idx}
              label={e}
              variant="outlined"
              sx={{color:grey[600]}}
            />)
          })}
        </Stack>
      </Grid>
    </Grid>
  )
}


// const LinkIcon = (keyName) => {

// }

const CompanySummary = ({links}) => {
  useEffect(() => {
    console.log("aaa");
    // console.log(links);
    console.log(Object.keys(links));
    // links.map(e => {
    //   Object.key
    // })
  }, []);

  const linkIconKeys = [
    "twitter", "reddit", "discord", "github", "telegram",
  ];

  const getLinkIcon = (keyName) => {
    switch (keyName) {
      case "twitter":
        return <Twitter/>
      case "reddit":
        return <Reddit/>
      case "discord":
        return <FontAwesomeIcon icon={faDiscord} />
      case "github":
        return <GitHub />
      case "telegram":
        return <Telegram />
    }
    return null;
  }

  const getLinkButton = ({keyName, href}) => {
    if (!linkIconKeys.includes(keyName)) return null
    return (<Button
      variant="text" startIcon={getLinkIcon(keyName)} size={"small"} sx={{borderRadius:4}}
      onClick={(e)=>{
        e.preventDefault();
        window.location.href=href;
      }}
    >
      {keyName?.toUpperCase()}
    </Button>)
  };

  return (
    <Card>
      <CardContent>
        <Stack
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{marginBottom:4}}
        >
          <Button
            startIcon={<CallMade />}
            sx={{borderRadius:4}}
            variant="contained"
            onClick={(e)=>{
              e.preventDefault();
              window.location.href=links.website;
            }}
          >
            Visit website
          </Button>
        </Stack>
        <Stack
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={1}
        >
          {Object.keys(links).map(key => {
            return getLinkButton({keyName: key, href: links[key]})
          })}
        </Stack>
      </CardContent>
      <Divider />
      <CardContent>
        <Button variant="outlined" startIcon={<Share />} sx={{borderRadius:4}}>
          Share
        </Button>
      </CardContent>
    </Card>
  )
}

const CompanyDetails = () => {
  const isMounted = useMounted();
  const [projectInfo, setProjectInfo] = useState(null);
  const theme = useTheme();
  const Chart = dynamic(() => import("../../../components/projects/ProjectChart"), {
    ssr: false
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getProjectInfo = useCallback(async () => {
    try {
      const data = await projectInfoApi.getProjectInfo();
      if (isMounted()) {
        const pageName = window.location.pathname.trim().split('/').slice(-1).pop().toUpperCase();
        console.log('pageName: ' + pageName);
        console.log(data[pageName].links);
        setProjectInfo(data[pageName]);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getProjectInfo();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  if (!projectInfo) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          {projectInfo.title}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
          // backgroundColor:"#00ff"
        }}
      >
        <Container maxWidth="lg" style={{backgroundColor:"transparent"}}>
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/projects"
              passHref
            >
              <Link
                color="textPrimary"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  Projects
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <Card>
                <CardHeader
                  disableTypography
                  title={(
                    <Header
                      logoImg={projectInfo.logo}
                      title={projectInfo.title}
                      description={projectInfo.shortDescription}
                      tags={projectInfo.tags}
                    />
                  )}
                />
                <Divider />
                <CardContent>
                  <Stack>
                    <Stack
                      sx={{marginLeft: 2}}
                      direction={"row"}
                      spacing={1}
                      justifyContent="flex-start"
                      alignItems="center">
                      <Avatar
                        src={projectInfo.logo}
                        sx={{
                          background: 'transparent',
                          width: 32,
                          height: 32,
                        }}
                        variant="rounded"
                      />
                      <Typography variant="h6" align={"left"}>
                        {projectInfo.symbol}
                      </Typography>
                    </Stack>
                    <Stack direction={"row"} spacing={1} sx={{marginLeft: 2, marginTop: 1}} alignItems="flex-start">
                      <Typography variant="body1" align={"left"}>
                        $0.406218
                      </Typography>
                      <Typography variant="body2" align={"left"} sx={{color: red[500]}}>
                        -3.2%
                      </Typography>
                    </Stack>
                    <Box component="span" sx={{ marginTop: 5 }}>
                      <Chart symbol={projectInfo.symbol}/>
                    </Box>
                  </Stack>
                </CardContent>
                <CardContent sx={{marginTop:-5}}>
                  <CompanyOverview projectInfo={projectInfo} />
                </CardContent>
              </Card>
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <CompanySummary links={projectInfo.links} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

CompanyDetails.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default CompanyDetails;
