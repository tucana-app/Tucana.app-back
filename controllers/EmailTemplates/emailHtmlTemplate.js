module.exports = function email(data) {
  const { titleEN, textEN, titleES, textES } = data;

  return `
  <!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title>${titleES}</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if mso]> 
      <noscript> 
        <xml> 
          <o:OfficeDocumentSettings> 
          <o:PixelsPerInch>96</o:PixelsPerInch> 
          </o:OfficeDocumentSettings> 
        </xml> 
      </noscript> 
    <![endif]-->

    <style>
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: inherit !important;
      }
      #MessageViewBody a {
        color: inherit;
        text-decoration: none;
      }
      p {
        line-height: inherit;
      }
      .desktop_hide,
      .desktop_hide table {
        mso-hide: all;
        display: none;
        max-height: 0;
        overflow: hidden;
      }
      @media (max-width: 920px) {
        .social_block.desktop_hide .social-table {
          display: inline-block !important;
        }
        .row-content {
          width: 100% !important;
        }
        .mobile_hide {
          display: none;
        }
        .stack .column {
          width: 100%;
          display: block;
        }
        .mobile_hide {
          min-height: 0;
          max-height: 0;
          max-width: 0;
          overflow: hidden;
          font-size: 0;
        }
        .desktop_hide,
        .desktop_hide table {
          display: table !important;
          max-height: none !important;
        }
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      background-color: #fff;
      padding: 0;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    "
  >
    <div style="display: none; max-height: 0px; overflow: hidden;">
      Tucána - ${titleES} - ${titleEN}
    </div>
    
    <div style="display: none; max-height: 0px; overflow: hidden;">
      &#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;
    </div>

    <table
      class="nl-container"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff"
    >
      <tbody>
        <tr>
          <td>
            <table
              class="row row-1"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #fff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="image_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    width: 100%;
                                    padding-right: 0;
                                    padding-left: 0;
                                  "
                                >
                                  <div
                                    class="alignment"
                                    align="center"
                                    style="line-height: 10px"
                                  >
                                    <img
                                      src="https://images2.imgbox.com/7e/bf/O56rHbrl_o.png"
                                      style="
                                        display: block;
                                        height: auto;
                                        border: 0;
                                        width: 180px;
                                        max-width: 100%;
                                      "
                                      width="180"
                                      alt="Tucána"
                                      title="Tucána"
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-2"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #fff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="text_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-top: 10px;
                                    padding-right: 10px;
                                    padding-bottom: 5px;
                                    padding-left: 10px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #999;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        (English below)
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-right: 10px;
                                    padding-left: 10px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #555;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <span style="color: #000000"
                                          ><strong
                                            ><span style="font-size: 30px"
                                              >${titleES}</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-3"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #555;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 18px;
                                            color: #000000;
                                          "
                                          >${textES}</span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-3"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #fff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="text_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-top: 10px;
                                    padding-right: 10px;
                                    padding-left: 10px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #555;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <span style="color: #000000"
                                          ><strong
                                            ><span style="font-size: 30px"
                                              >${titleEN}</span
                                            ></strong
                                          ></span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #555;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <span
                                          style="
                                            font-size: 18px;
                                            color: #000000;
                                          "
                                          >${textEN}</span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-4"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #fff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="html_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                            >
                              <tr>
                                <td class="pad">
                                  <div
                                    style="
                                      font-family: Arial, Helvetica Neue,
                                        Helvetica, sans-serif;
                                      text-align: center;
                                    "
                                    align="center"
                                  >
                                    <hr
                                      style="
                                        height: 1px;
                                        background-color: #555555;
                                        border: none;
                                      "
                                    />
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-5"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #fff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="text_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #888;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        Tucána es una aplicación gratuita,
                                        ayúdanos a cubrir nuestros costes
                                        haciendo una donación.
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        &nbsp;
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        Tucána is a free app, help us cover our
                                        costs by making a donation.
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    padding-top: 20px;
                                    padding-right: 10px;
                                    padding-bottom: 40px;
                                    padding-left: 10px;
                                  "
                                >
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #fff;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <strong
                                          ><span style="font-size: 20px"
                                            ><a
                                              href="https://fund.tucana.app"
                                              target="_blank"
                                              style="
                                                text-decoration: underline;
                                                color: #69d052;
                                              "
                                              rel="noopener"
                                              >Donación / Donate</a
                                            ></span
                                          ></strong
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-6"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #69d052;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #69d052;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="social_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                              style="mso-table-lspace: 0; mso-table-rspace: 0"
                            >
                              <tr>
                                <td
                                  class="pad"
                                  style="
                                    text-align: center;
                                    padding-top: 10px;
                                    padding-bottom: 10px;
                                    padding-right: 0;
                                    padding-left: 0;
                                  "
                                >
                                  <div class="alignment" align="center">
                                    <table
                                      class="social-table"
                                      width="364px"
                                      border="0"
                                      cellpadding="0"
                                      cellspacing="0"
                                      role="presentation"
                                      style="
                                        mso-table-lspace: 0;
                                        mso-table-rspace: 0;
                                        display: inline-block;
                                      "
                                    >
                                      <tr>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="https://www.facebook.com/tucanaapp"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/facebook@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Facebook"
                                              title="Facebook"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="m.me/tucanaapp"
                                            target="_blank"
                                            ><img
                                              src="https://images2.imgbox.com/c6/3d/5uRTskcD_o.png"
                                              width="32"
                                              height="32"
                                              alt="Messenger"
                                              title="Messenger"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="wa.me/50687882262"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/whatsapp@2x.png"
                                              width="32"
                                              height="32"
                                              alt="WhatsApp"
                                              title="WhatsApp"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="https://instagram.com/tucana.app"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/instagram@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Instagram"
                                              title="Instagram"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="https://t.me/tucanaapp"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/telegram@2x.png"
                                              width="32"
                                              height="32"
                                              alt="Telegram"
                                              title="Telegram"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="mailto:mailto:info@tucana.app"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/mail@2x.png"
                                              width="32"
                                              height="32"
                                              alt="E-Mail"
                                              title="E-Mail"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                        <td style="padding: 0 10px 0 10px">
                                          <a
                                            href="https://www.youtube.com/channel/UC7Lgy0zvtM5zpJ0SuC76YFg"
                                            target="_blank"
                                            ><img
                                              src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-circle-white/youtube@2x.png"
                                              width="32"
                                              height="32"
                                              alt="YouTube"
                                              title="YouTube"
                                              style="
                                                display: block;
                                                height: auto;
                                                border: 0;
                                              "
                                          /></a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              class="row row-7"
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                mso-table-lspace: 0;
                mso-table-rspace: 0;
                background-color: #fff;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      class="row-content stack"
                      align="center"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        mso-table-lspace: 0;
                        mso-table-rspace: 0;
                        background-color: #fff;
                        color: #000;
                        border-radius: 0;
                        width: 900px;
                      "
                      width="900"
                    >
                      <tbody>
                        <tr>
                          <td
                            class="column column-1"
                            width="100%"
                            style="
                              mso-table-lspace: 0;
                              mso-table-rspace: 0;
                              font-weight: 400;
                              text-align: left;
                              vertical-align: top;
                              padding-top: 5px;
                              padding-bottom: 5px;
                              border-top: 0;
                              border-right: 0;
                              border-bottom: 0;
                              border-left: 0;
                            "
                          >
                            <table
                              class="text_block block-1"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #555;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 14px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        <em
                                          ><span style="font-size: 12px"
                                            >Copyright © 2023 -
                                            Tucána.&nbsp;</span
                                          ></em
                                        ><br /><em
                                          ><span style="font-size: 12px"
                                            >Todos los derechos
                                            reservados.</span
                                          ></em
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table
                              class="text_block block-2"
                              width="100%"
                              border="0"
                              cellpadding="10"
                              cellspacing="0"
                              role="presentation"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                word-break: break-word;
                              "
                            >
                              <tr>
                                <td class="pad">
                                  <div style="font-family: sans-serif">
                                    <div
                                      class
                                      style="
                                        font-size: 14px;
                                        mso-line-height-alt: 16.8px;
                                        color: #999;
                                        line-height: 1.2;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                      "
                                    >
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        "
                                      >
                                        <span style="font-size: 12px"
                                          >Tucána le envía este correo
                                          electrónico como parte del uso de sus
                                          servicios. Acceda a los
                                          <a
                                            href="https://tucana.app/terms"
                                            target="_blank"
                                            style="
                                              text-decoration: underline;
                                              color: #69d052;
                                            "
                                            rel="noopener"
                                            >términos y condiciones aquí</a
                                          >. Para más información sobre el
                                          tratamiento de sus datos personales,
                                          le invitamos a consultar nuestra
                                          <a
                                            href="https://tucana.app/privacy"
                                            target="_blank"
                                            style="
                                              text-decoration: underline;
                                              color: #69d052;
                                            "
                                            rel="noopener"
                                            >política de privacidad</a
                                          >.</span
                                        >
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          text-align: center;
                                          mso-line-height-alt: 16.8px;
                                        "
                                      >
                                        &nbsp;
                                      </p>
                                      <p
                                        style="
                                          margin: 0;
                                          font-size: 12px;
                                          text-align: center;
                                          mso-line-height-alt: 14.399999999999999px;
                                        "
                                      >
                                        <span style="font-size: 12px"
                                          >This email is sent to you by Tucána,
                                          as part of your use of its services.
                                          Access the
                                          <a
                                            href="https://tucana.app/terms"
                                            target="_blank"
                                            style="
                                              text-decoration: underline;
                                              color: #69d052;
                                            "
                                            rel="noopener"
                                            >terms & conditions here</a
                                          >. For more information about the
                                          treatment of your personal data, we
                                          invite you to consult our
                                          <a
                                            href="https://tucana.app/privacy"
                                            target="_blank"
                                            style="
                                              text-decoration: underline;
                                              color: #69d052;
                                            "
                                            rel="noopener"
                                            >privacy policy</a
                                          >.</span
                                        >
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- End -->
  </body>
</html>`;
};
