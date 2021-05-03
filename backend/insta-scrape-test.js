/* RESOURCES 
https://www.reddit.com/r/learnpython/comments/bdpjz1/is_it_possible_to_scrape_instagram_comments_for/
https://www.bestproxyreviews.com/instagram-scraper/
https://stackoverflow.com/questions/59824750/scraping-all-comments-under-an-instagram-post 
https://github.com/arc298/instagram-scraper
https://stackoverflow.com/questions/26400943/selenium-webdriver-how-to-select-records-from-table-by-fetching-excel-input?rq=1
https://stackoverflow.com/questions/41405697/how-to-extract-instagram-data
https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_By.html
https://www.youtube.com/watch?v=iJGvYBH9mcY&ab_channel=PythonSimplified
SLEEP
https://www.selenium.dev/selenium/docs/api/javascript/module/selenium-webdriver/ie_exports_Driver.html#sleep
  Ex.   await driver.sleep(5000)
  Attribute selectors
  5.8 Attribute selectors
CSS 2.1 allows authors to specify rules that match elements which have certain attributes defined in the source document.
https://www.w3.org/TR/CSS2/selector.html#adjacent-selectors
SELECTING CHILDREN OF NODE
https://stackoverflow.com/questions/5119655/xpath-to-get-all-child-nodes-elements-comments-and-text-without-parent/5119937
Await examples
https://medium.com/@giltayar/javascript-asynchrony-and-async-await-in-selenium-webdriver-tests-a89924421f65


***** chromedriver not on path -> fixed by adding 'require chromedriver' and installing chromedriver with npm
https://stackoverflow.com/questions/26191142/selenium-nodejs-chromedriver-path 

*/




const {By,Builder,Key,util,withTagName,cssSelector,Select, WebDriver,until, promise,Promise,Map,map} = require('selenium-webdriver');
require('chromedriver')
const { elementIsDisabled } = require('selenium-webdriver/lib/until');
const fs = require('fs')
const chalk = require('chalk')
let comments = []


async function main_scrape_func(un,pw,celebChoice){
      let driver = await new Builder().forBrowser('chrome').build();
    
      await driver.get('https://instagram.com');
      await driver.sleep(2000)

      const username = await driver.wait(until.elementLocated(By.name('username')),1000);
      username.sendKeys(un) 
      //username.sendKeys('bhurnalcodes') 
      
      const password = await driver.wait(until.elementLocated(By.name('password')),1000);
      password.sendKeys(pw) 
      //password.sendKeys('s15koukie39') 

      await driver.sleep(2000)
      const loginButton = await driver.wait(until.elementLocated(By.css('#loginForm > div > div:nth-child(3) > button')),2000);
      loginButton.click();

    //to clear save login info by clicking "not now"
        await driver.sleep(2000)
        const saveLoginInfoButton = await driver.wait(until.elementLocated(By.className('cmbtv')),3000);
        await saveLoginInfoButton.click();

    //to clear turn on post notif button
      await driver.sleep(1000)
      const postNotifButton =  await driver.wait(until.elementLocated(By.className('aOOlW   HoLwm ')));
      await postNotifButton.click();
      

      //once logged in, go directly to celeb profile via url. 
      /* The other option here is the manually enter the celebs name in the search bar and click the first result. I tried this and it was tricky 
          This was the code. It would enter the celeb name and then hit enter, then enter again, this would go to the actual celebs page
              // const searchButton =  await driver.wait(until.elementLocated(By.className('XTCLo x3qfX')));
              // await searchButton.sendKeys('Kim Kardashian',Key.RETURN)
              // driver.sleep(1000)
              // await searchButton.sendKeys(Key.RETURN)
              // //await searchButton.sendKeys(Key.RETURN)
              // //await searchButton.sendKeys(Key.RETURN)
      */
      await driver.sleep(3000)
      await driver.get(`https://www.instagram.com/${celebChoice}/`);
      

    //clicking first post
      await driver.sleep(2000)
      const latestPost = await driver.findElement(By.css('#react-root > section > main > div > div._2z6nI > article > div:nth-child(1) > div > div:nth-child(1) > div:nth-child(1)'))
      await latestPost.click()



    //get the name of the person and store in file. use unshift to store append to the beginning of the array, then use unshift on the latestPostDate
    //body > div._2dDPU.CkGkG > div.zZYga > div > article > header > div.o-MQd > div.PQo_0 > div.e1e1d > span > a
    let userName = await driver.wait(until.elementLocated(By.css('body > div._2dDPU.CkGkG > div.zZYga > div > article > header > div.o-MQd > div.PQo_0 > div.e1e1d > span > a'))).getAttribute('innerText')
    let userNameAsString = 'Username: ' + userName + '|'
    fs.appendFile('comments.txt',userNameAsString,(err)=>{
      if(err){
        console.log(err)
      }
    })


    //get date of latest post and write to comments.txt   
      let latestPostDate =  await driver.wait(until.elementLocated(By.css('body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > div.k_Q0X.I0_K8.NnvRN > a > time'))).getAttribute('datetime')
      let latestPostDateAsString = 'LATEST POST: ' + latestPostDate + '|'
      fs.appendFile('comments.txt',latestPostDateAsString,(err)=>{
        if(err){
          console.log(err)
        }
      })
      
      async function scrapeComments(num){
          let i = 0
          while(i < num){
            //comments = await scrapeCommentsFromPost(driver)
            let postNum = 'POST NUM: ' + i
            let postComments = await scrapeCommentsFromPost(driver)
            let numberedScrape = postNum + '~~~~~' + postComments
            let tempArr = [numberedScrape]
            comments = tempArr
            driver.sleep(Math.random() * 2000)
            //console.log(comments)
            await writeToFile(comments)
            nextPost(driver)
            i++;
          }
      }
       await scrapeComments(5) //POST NUM HERE !!! //hardcoded number of posts to get (2) chosen for testing, should be dynamically fed
       console.log(chalk.red(':::::DONE::::::'))
       comments.unshift(latestPostDateAsString)
       return comments;
}
//=================================================================================================
     
  /*TARGETING COMMENTS SECTION
      Goal:  Target UL of all comments - class: XQXOT pxf-y,
             Then in the UL, get all Mr508 elements, these are comments
  */
  

          // const commentsList = await (await driver.findElement(By.xpath('/html/body/div[4]/div[2]/div/article/div[3]/div[1]/ul'))).getAttribute('innerText')
          // console.log(commentsList)
      

     /* READ
        This function is called for each post, it targets and scrapes the comments
        Instagram loads 12 comments at a time -> this function takes an argument specifying how many sets of comments to load and thus scrape
        Once the comments are scraped, they are pushed to the array 'arrayComments' and the array is returned from the function
        The array returned holds the comments from an individual post
      */     
     async function scrapeCommentsFromPost (driver) {   

        let arrayComments = new Array(); //array to hold date and comments from individual post
        
       //clicks '+' to load more another set of comments -> (driver,numOfCommentSets)
        await loadMore(driver,20); //!!!!!!!!!!!!!! *****&*&*&*&*&*&&&*&*** ADJUST NUM OF COMMENT SETS TO GET HERE!! !!!!!!!!!!!!!! *****&*&*&*&*&*&&&*&*** //

        //**targeting list of comments UL class: 'XQXOT pxf-y' , this returns a web element promise
        let commentListRootPromise = await driver.findElement(By.css('body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > div.EtaWk > ul'));
        
        //** Returns an array of promises -specifically getting all elements that ar just Mr508, these are the comments */
        let commentListChildren = await commentListRootPromise.findElements(By.className('Mr508'))

       
        /**Iterate each Mr508, find span, and extract inner text, this is the pure comment text, 
          then push to arrayComments */
        for(i=0;i<commentListChildren.length;i++){
          //**get span section of 508 to then get text from span using 'innerText' NEED TO DO THIS FOR EACH 508 element
            let spanText508 = await commentListChildren[i].findElement(By.css('.C4VMK > span'))
          //**then get innerText
            let innerText = await spanText508.getAttribute('innerText').then((text)=>{
                //console.log('this is just the text: '+ text) -FOR TESTING
                //innerText = text; FOR TESTING
                return text
            })
            //console.log('this is innnerText: ' + innerText)- FOR TESTING
            arrayComments.push(innerText)
        }
       
        //console.log('m length is '+ arrayComments.length)
        //console.log('this is arrayComments contents: ' + arrayComments) //checking of of array contents
        
        return arrayComments;
    }
//--------------------------------------------------------------  
//WRITE COMMENTS FROM ARRAYCOMMENTS TO FILE
    function writeToFile(comments){
      comments.forEach((element)=>{
        elementSpace = element + ', '
          fs.appendFile('comments.txt',elementSpace,(err)=>{
            if(err){
              console.log('error')
            }
          })
        })
        console.log(chalk.red(':::::COMMENTS WRITTEN TO FILE::::::'))
     }
//------------------------------------------------------------------
//==================================================================

  /** function that clicks next arrow to get next post and begin scrape again */
    async function nextPost (driver){
      let nextPostArrow = await driver.findElement(By.css('body > div._2dDPU.CkGkG > div.EfHg9 > div > div > a._65Bje.coreSpriteRightPaginationArrow'))
      await driver.sleep(2500)
      nextPostArrow.click();
      console.log(chalk.red(':::::GOING TO NEXT POST::::::'))
    }
    /* this alternate version of nextPost using the RIGHT arrow key to visit next post in case the right post arrow is not located*/
      // async function nextPost2(driver){
      //   await driver.sleep(2500)
      //   driver.sendKeys(Key.RIGHT)
      // console.log(chalk.red(':::::GOING TO NEXT POST::::::'))
      // }

    /** Load more comments on post */
  async function loadMore(driver,commentSets){
      i = 0;
      while(i < commentSets){
        await driver.sleep(2000)
        const loadMore = await driver.wait(until.elementLocated(By.css('body > div._2dDPU.CkGkG > div.zZYga > div > article > div.eo2As > div.EtaWk > ul > li > div')),10000)
        loadMore.click()
        i++;
      }
      console.log(chalk.red(':::::LOADING COMMENTS::::::'))
    }
//=================================================================
/** CORE APP FUNCTIONALITY */

 async function runScraper(UN,PW,celebChoice){
    let returnedComments = await main_scrape_func(UN,PW,celebChoice)
    return returnedComments
 } 
 
//  var UN ='SentiScrape';
//  var PW ='kirklandExpo';
//  let celebChoice =  'cristiano'
// runScraper(UN,PW,celebChoice)

//======================================================


module.exports = {
    runScraper: runScraper,
    
}